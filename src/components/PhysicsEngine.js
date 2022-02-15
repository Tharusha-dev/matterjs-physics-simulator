import { useEffect, useRef } from 'react'
import { Events, Engine, Render, Bodies, World ,Runner, Mouse , MouseConstraint} from 'matter-js'

function Comp ({selectedShape}) {

  
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    const cw = 1200;
    const ch = 700;

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

    let mouse = Mouse.create(render.canvas);

    let mouseConstraint = MouseConstraint.create(engine.current,{mouse : mouse,constraint : {render : {visible : false}}})

    render.mouse = mouse;

    World.add(engine.current.world, [
      Bodies.rectangle(cw/2, 0, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw/2, ch, cw, 20, { isStatic: true }),
      Bodies.rectangle(0, ch/2 , 20, ch, { isStatic: true }),
      Bodies.rectangle(cw, ch/2 , 20, ch, { isStatic: true }),
      Bodies.rectangle(200,200 , 20, 20, ),
      mouseConstraint

    ])


    Runner.run(engine.current)
    Render.run(render)

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

  
  const getSelected = function(e){

    if(selectedShape = 1 ){
      addCircle(e)

    }
    else{
      addRectangle(e)
    }

  }

  const addCircle = function(e) {
    console.log("Circle at " + e.clientX)
    World.add(engine.current.world,[Bodies.circle(e.pageX-350,e.pageY-250,10)])

  }

  const addRectangle =  e => {
    console.log("Rectangle at " + e.clientX)

    World.add(engine.current.world,[Bodies.rectangle(e.pageX-350,e.pageY-250,20,20)])
    
  }

 

  return (
    

      <div ref={scene}  onClick= {getSelected} className= 'this'/>
      // {(e) => {World.add(engine.current.world,[Bodies.circle(e.pageX-350,e.pageY-250,20)])}}
  )
}

export default Comp