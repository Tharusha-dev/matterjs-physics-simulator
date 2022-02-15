import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  const draw = (ctx) => {
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(50, 100, 10, 0, 2 * Math.PI, false)
    ctx.fillRect(0, 0, 1100, 700);
    ctx.fill()
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    //Our draw came here
    const render = () => {
      draw(context)
    }

    render()
    
    return () => {
    }
  }, [draw])
  
  return <div style={{position:"absolute",zIndex:"1"}}><p>test hellll</p><canvas ref={canvasRef} {...props} width="1100px" height="700px"/></div>
}

export default Canvas;