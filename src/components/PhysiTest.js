import {Fragment, useEffect, useRef, React} from 'react';
import Matter from 'matter-js';

function PhysiTest() {
  const requestRef = useRef();
  const boxRef = useRef();
  const groundRef = useRef();

  const animate = () => {
    const engine = Matter.Engine.create();
    
    const box = {
      body: Matter.Bodies.rectangle(150, 0, 40, 40),
      elem: boxRef.current,
      render() {
        const {x, y} = this.body.position;
        this.elem.style.top = `${y - 20}px`;
        this.elem.style.left = `${x - 20}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
    };
    const ground = Matter.Bodies.rectangle(
      200, 200, 400, 120, {isStatic: true}
    );
    const mouseConstraint = Matter.MouseConstraint.create(
      engine, {element: document.body}
    );
    Matter.World.add(
      engine.world, [box.body, ground, mouseConstraint]
    );
    
    (function rerender() {
      box.render();
      Matter.Engine.update(engine);
      requestRef.current = requestAnimationFrame(rerender);
    })();
  };
  
  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  
  return (
    <Fragment>
      <div id="box" ref={boxRef}></div>
      <div id="ground" ref={groundRef}></div>
    </Fragment>
  );


    


}

export default PhysiTest;
