import { useState, useEffect, useRef } from 'react';
import { Events ,Composite, Engine, Render, Bodies,World ,Runner, Mouse , MouseConstraint} from 'matter-js'
import Header from './components/Header';
import PropertiesMenu from './components/PropertiesMenu';
import ProjectsPanel from './components/specialObjects.js';
import GraphsMenu from './components/GraphsMenu';
import Footer from './components/Footer.js';
import ScreenSizeChangeWarning from './components/screenSizeChangeWarning.js';
import './App.css';



function App() {


  let defaultObjectProperties = {
    shape : 1,
    gravity : 1,
    size:30,
    density : 0.001,
    friction : 0.1,
    color : "#1ed760"
  }



  let defaultWorldProperties = {
    reset : false,
  }

  const [properties, setProperties] = useState(defaultObjectProperties);
  const [worldProperties,setWorldProperties] = useState(defaultWorldProperties);

  const [isErasing,setIsErasing] = useState(false);
  const erasingRef = useRef(false);


  const [isSelectingGraph,setIsSelectingGraph] = useState(false)
  const graphSelectRef = useRef(false)  

  const [graphingPos,setGraphingPos] = useState(0)
  const [ticks,setTicks] = useState(1)

  const [selectedObject,setSelectedObject] = useState()
  const selectedObjectRef = useRef()

  const [spawnerProperties,setSpawnerProperties] = useState({body:1,color:"#1ed760",density:0.001,friction:0.1})
  const spawningBodyRef = useRef(1);
  const [isSpawning,setIsSpawning] = useState(false)
  const isSpawningRef = useRef(false)

  const [spawnerLocation,setSpawnerLocation] = useState(null)
  const [isScreenSizeWarning,setIsScreenSizeWarning] = useState(false)

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);


  
  let spawnerLocationRef = useRef(null)

  const countTen = useRef(0)

  let graphingObject = null
  let initialWidth;
  let initialHeight;

  

  const getSpawnerProperties = function(childdata){
    
    spawningBodyRef.current = childdata.body
    console.log(spawningBodyRef.current)
    setSpawnerProperties(childdata)

  }

  const getProperties = (childdata) => {
    setProperties(childdata);
  }

  const getWorldProperties = (childdata) => {
    setWorldProperties(childdata)
  }


  const getIsErased = () => {
    setIsErasing(!isErasing)
    erasingRef.current = !isErasing
  }

  const getIsGraphSelecting = () => {
    setIsSelectingGraph(!isSelectingGraph)
    graphSelectRef.current = !isSelectingGraph
  }

  const getIsSpawning = () => {
    setIsSpawning(!isSpawning)
    isSpawningRef.current = !isSpawning

  }

  const scene = useRef()   
  const isDragging = useRef(false)
  const engine = useRef(Engine.create())

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    if (window.innerWidth != initialWidth || window.innerHeight != initialHeight && !isMobile){
      setIsScreenSizeWarning(true);
    }
}


  useEffect(() => {

    initialWidth = window.innerWidth;
    initialHeight = window.innerHeight;

    const cw = width*0.57;
    const ch = height*0.8;



    const render = Render.create({
      canvas : scene.current,
      
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

    console.log("gravity "+engine.current.gravity.y + "x : " + engine.current.gravity.x)
    let context = render.canvas.getContext('2d')
    let mouse = Mouse.create(render.canvas);

    let mouseConstraint = MouseConstraint.create(engine.current,{mouse : mouse,constraint : {render : {visible : false}}})
    render.mouse = mouse;

    World.add(engine.current.world, [
      Bodies.rectangle(cw/2, 0, cw, 20, { isStatic: true, density:1 }),
      Bodies.rectangle(cw/2, ch, cw, 20, { isStatic: true, density:1}),
      Bodies.rectangle(0, ch/2 , 20, ch, { isStatic: true ,density:1}),
      Bodies.rectangle(cw, ch/2 , 20, ch, { isStatic: true ,density:1}),
   
      mouseConstraint,

    ])

    Runner.run(engine.current)
    Render.run(render)
    
    Events.on(mouseConstraint,"mousedown",function(event){handleSelections(mouseConstraint)})
    

    Events.on(mouseConstraint,"startdrag",function(event){isDragging.current = true })
    Events.on(mouseConstraint,"enddrag",function(){isDragging.current = false })



    Events.on(engine.current,'afterUpdate',function(){

  
      countTen.current = countTen.current + 1 ; 
      
      if(countTen.current == 10){
        countTen.current = 0;
      
        if(selectedObjectRef.current != null){
          
          setGraphingPos(selectedObjectRef.current.velocity.y * -1);
          
          setTicks(ticks+1)}}

      if (isSpawningRef.current && spawnerLocationRef.current != null) {
     


        if(spawningBodyRef.current == 1 ){
        World.add(engine.current.world,[Bodies.circle(spawnerLocationRef.current["x"],spawnerLocationRef.current["y"],10)])

        }if (spawningBodyRef.current == 2 ) {
          
          World.add(engine.current.world,[Bodies.rectangle(spawnerLocationRef.current["x"],spawnerLocationRef.current["y"],10,10)])
          // World.add(engine.current.world,[Bodies.circle(spawnerLocationRef.current["x"],spawnerLocationRef.current["y"],10)])

        }


      } 
        
  
      })



      window.addEventListener('resize', handleWindowSizeChange);
  


    return () => {

      window.removeEventListener('resize', handleWindowSizeChange);
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }

    
  }, [])

  const isMobile = width <= 935;

  const handleSelections = function(mouseConstraint){



    if(isSpawningRef.current){

      console.log("spawn")
      setSpawnerLocation({x:mouseConstraint.mouse.position.x,y:mouseConstraint.mouse.position.y})
      spawnerLocationRef.current = {x:mouseConstraint.mouse.position.x,y:mouseConstraint.mouse.position.y}
      console.log(spawnerLocationRef)


    }

    if(erasingRef.current && mouseConstraint.body != null){
      console.log(mouseConstraint.body)
      Composite.remove(engine.current.world,mouseConstraint.body)
    }


    if(graphSelectRef.current && mouseConstraint.body != null){
      setSelectedObject(mouseConstraint.body)
      graphingObject = mouseConstraint.body
      graphingObject.render.lineWidth = 6

      selectedObjectRef.current = mouseConstraint.body
      setIsSelectingGraph(false)
      graphSelectRef.current = false

    }

  
  }

  const resetGraphing = function(){
    selectedObjectRef.current = null
    
    selectedObject.render.lineWidth = 0

  }

  const stopGraphing = function(){
    selectedObjectRef.current = null
  

  }



  const handleMouseDown = function(e){

    if(!isSelectingGraph && !isErasing && !isDragging.current){
      const canvasRect = scene.current.getBoundingClientRect(); //canvas offset
      if(properties.shape == 1 ){

  
        World.add(engine.current.world,[Bodies.circle(e.pageX-canvasRect.left,e.pageY-canvasRect.top,properties.size,{density : properties.density,friction:properties.friction,render:{fillStyle : properties.color}})])
      
      }
      
      if(properties.shape == 2){ 
    
  
        World.add(engine.current.world,[Bodies.rectangle(e.pageX-canvasRect.left,e.pageY-canvasRect.top,properties.size,properties.size,{density : properties.density,friction:properties.friction,render:{fillStyle : properties.color}})])
        
      }
    }
  

 
  }

  const resetScene = function(){
 
    const toRemove = Composite.allBodies(engine.current.world).slice(4,Composite.allBodies(engine.current.world).length)
    toRemove.forEach((body)=>{Composite.remove(engine.current.world, body)})
  }




  return (

    
    <>
    <Header/>

    {isMobile ? <div className='mobile-screen'>

<h1>Please use a desktop device to use this website</h1>
<h2>Sorry for the inconvenience caused</h2>
    </div> : 
    
    <>
    <PropertiesMenu functions={{ reset:resetScene,erase:getIsErased }} worldProperties = {getWorldProperties}  objectProperties = {getProperties}/>
    <ProjectsPanel setSpawning = {getIsSpawning} spawnerProperties = {getSpawnerProperties} />
    <canvas ref={scene} onClick= {handleMouseDown} className= 'physics-engine'></canvas>
   
    <GraphsMenu functions = {{reset:resetGraphing,stop:stopGraphing}} graphingData={{time:ticks,data:graphingPos}} graphSelect = {getIsGraphSelecting} />
   
    
    </>
    }
{isScreenSizeWarning ?  <ScreenSizeChangeWarning/> : <></>}
    <Footer />
    

    </>
      
  )
}

export default App;


