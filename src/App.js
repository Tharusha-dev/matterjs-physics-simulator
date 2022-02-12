import { useState, useEffect, useRef } from 'react';
import { Events ,Composite, Engine, Render, Bodies, Body,World ,Runner, Mouse , MouseConstraint} from 'matter-js'
import Header from './components/Header';
import PropertiesMenu from './components/PropertiesMenu';
import ProjectsPanel from './components/ProjectsPanel';
import GraphsMenu from './components/GraphsMenu';
import Footer from './components/Footer.js';
import './App.css';
let testObj = Bodies.rectangle(200,200,40,40,)
// let testObj2 = Bodies.rectangle(500,200,40,40,)
let testObj2 = Bodies.circle(500,200,20)




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

  const countTen = useRef(0)
  let graphingObject = null



  const getProperties = (childdata) => {
    setProperties(childdata);
  }

  const getIsErased = () => {
    setIsErasing(!isErasing)
    erasingRef.current = !isErasing
  }

  const getIsGraphSelecting = () => {
    setIsSelectingGraph(!isSelectingGraph)
    graphSelectRef.current = !isSelectingGraph
  }

  const getWorldProperties = (childdata) => {
    setWorldProperties(childdata)
  }

  // const loadImage = (url, onSuccess, onError) => {
  //   const img = new Image();
  //   img.onload = () => {
  //     onSuccess(img.src);
  //   };
  //   img.onerror = onError();
  //   img.src = url;
  // };

  // loadImage('Ellipse.png',url =>{console.log("sucesss");let highlightedTextuere = url },() => {console.log("image load error")})

  const scene = useRef()
  const isDragging = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    const cw = 1100;
    const ch = 700;


    // highlightedTextuere.onload = () =>  

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

 
    // highlightedTextuere.onerror(console.log("t"))
    // highlightedTextuere.onError(()=>{console.log("why")})


    let mouse = Mouse.create(render.canvas);

    let mouseConstraint = MouseConstraint.create(engine.current,{mouse : mouse,constraint : {render : {visible : false}}})
    render.mouse = mouse;

    World.add(engine.current.world, [
      Bodies.rectangle(cw/2, 0, cw, 20, { isStatic: true, density:1 }),
      Bodies.rectangle(cw/2, ch, cw, 20, { isStatic: true, density:1}),
      Bodies.rectangle(0, ch/2 , 20, ch, { isStatic: true ,density:1}),
      Bodies.rectangle(cw, ch/2 , 20, ch, { isStatic: true ,density:1}),
      // testObj,
      // testObj2,
      mouseConstraint,

    ])

    Runner.run(engine.current)
    Render.run(render)


    
    Events.on(mouseConstraint,"mousedown",function(event){handleSelections(mouseConstraint.body)})
    
    var dragBody = null;

    Events.on(mouseConstraint,"startdrag",function(event){isDragging.current = true ; dragBody = event.body})
    Events.on(mouseConstraint,"enddrag",function(){isDragging.current = false ; })

    Events.on(engine.current,'beforeUpdate',function(){


      // Tried to make a walkaround for CCD dosent seems to work :(

      // if(dragBody != null ){

      //   // console.log("drag")  
        
      //   if (dragBody.velocity.x > 20.0){
      //     Body.setVelocity(dragBody,{x:20,y:dragBody.velocity.y})
      //     console.log("drag tilllll")
          
      //   }

      //   if (dragBody.velocity.y > 20.0){
      //     Body.setVelocity(dragBody,{x: dragBody.velocity.x, y:20})
      //   }

      //   if (dragBody.positionImpulse.x > 20.0) {
      //     dragBody.positionImpulse.x = 20.0;
      //   }

      //   if (dragBody.positionImpulse.y > 20.0) {
      //     dragBody.positionImpulse.y = 20.0;
      //   }
      // }


    })

    


    Events.on(engine.current,'afterUpdate',function(){

      countTen.current = countTen.current + 1 ; 
      
      if(countTen.current == 10){
        // console.log("done");
        countTen.current = 0;
      
        if(selectedObjectRef.current != null){
          
          setGraphingPos(selectedObjectRef.current.velocity.y * -1);
          // console.log(selectedObjectRef.current.velocity.y * -1)
          
          setTicks(ticks+1)}}})

  // Events.on(engine.current.world)

    return () => {
      
      
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])


  const handleSelections = function(body){

    // console.log(body)
    // console.log(graphSelectRef.current)

    if(erasingRef.current && body != null){
      console.log(body)
      Composite.remove(engine.current.world,body)
    }


    if(graphSelectRef.current && body != null){
      setSelectedObject(body)
      graphingObject = body
      graphingObject.render.lineWidth = 6
      // selectedObject.render.lineWidth = 6
      // body.render.lineWidth = 6
      // setSelectedObject(body)
      selectedObjectRef.current = body
      setIsSelectingGraph(false)
      graphSelectRef.current = false
      // setGraphingPos(body.position.y)

    }

  
  }

  const stopGraphing = function(){
    selectedObjectRef.current = null
    console.log("stopped graphing")
    selectedObject.render.lineWidth = 1

  }

  // const stopEngine = function(){

  //   // World.clear(engine.current.world)
  //   Engine.clear(engine.current)
  //   Runner.stop(engine.current)
  //   // Render.stop(render)

  // }

  const handleMouseDown = function(e){
    // console.log(testObj.position.y)


    // propertiesData[0].worldProperties[0].reset = "test"
    // Body.set(testObj,{render:{fillStyle : "red"}})
    


    // console.log(propertiesData[0].worldProperties[0].reset)
    // testObj2.render.lineWidth = 6

    if(!isSelectingGraph && !isErasing && !isDragging.current && properties.shape == 1 ){

  
      World.add(engine.current.world,[Bodies.circle(e.pageX-380,e.pageY-240,properties.size,{density : properties.density,friction:properties.friction,render:{fillStyle : properties.color}})])
    
    }if(!isSelectingGraph && !isErasing && !isDragging.current && properties.shape == 2){ 
      // console.log(properties.shape);

      console.log("fric "+properties.friction)

      World.add(engine.current.world,[Bodies.rectangle(e.pageX-380,e.pageY-240,properties.size,properties.size,{density : properties.density,friction:properties.friction,render:{fillStyle : properties.color}})])
      
    }
  }

  const resetScene = function(){
    console.log(Composite.allBodies(engine.current.world));
    const toRemove = Composite.allBodies(engine.current.world).slice(4,Composite.allBodies(engine.current.world).length)
    toRemove.forEach((body)=>{Composite.remove(engine.current.world, body)})
  }




  return (

    
    <>
    <Header user_name="tharusha"/>
    <PropertiesMenu erase = {getIsErased} resetScene = {resetScene} worldProperties = {getWorldProperties}  objectProperties = {getProperties}/>
    <ProjectsPanel/>
    <div ref={scene} onClick= {handleMouseDown} className= 'this'/>
    <GraphsMenu stopGraphing = {stopGraphing} ticks={ticks} testData={graphingPos} graphSelect = {getIsGraphSelecting} />
    <Footer />
    </>
      
  )
}

export default App;


