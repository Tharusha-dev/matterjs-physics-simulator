import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World ,Runner} from 'matter-js'

function Comp (props) {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    const cw = 900;
    const ch = 600;

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

    World.add(engine.current.world, [
      Bodies.rectangle(cw/2, 0, cw, 10, { isStatic: true }),
      Bodies.rectangle(cw/2, ch, cw, 10, { isStatic: true }),
      Bodies.rectangle(0, ch/2, 10, ch, { isStatic: true }),
      Bodies.rectangle(cw, ch/2, 10, ch, { isStatic: true })
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

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseMove={handleAddCircle}
    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Comp