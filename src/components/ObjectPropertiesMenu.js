import { React, useState, useEffect } from 'react';
import Sketch from '@uiw/react-color-sketch';
import './objectPropertiesMenu.css'

function ObjectPropertiesMenu({ objectProperties, Index }) {



    const [selectedShape, setSelectedShape] = useState(1);

    const [color, setColor] = useState("#1ed760");
    const [previousColor, setPreviousColor] = useState("#1ed760");

    const [isApplied, setApplied] = useState(false);

    let [density, setDensity] = useState(0.001);
    let [previousDensity, setPreviousDensity] = useState(0.001);

    let [size, setSize] = useState(40);
    let [previousSize, setPreviousSize] = useState(40);

    let [friction, setFriction] = useState(0.1);
    let [previousFriction, setPreviousFriction] = useState(0.1);

    let [isColorOpen, setColorOpen] = useState(false);

    const setPrevoiousValues = function (pColor, pDensity, pSize, pFriction) {
        setPreviousColor(pColor)
        setPreviousDensity(pDensity)
        setPreviousSize(pSize)
        setPreviousFriction(pFriction)

    }


    useEffect(() => {

        setColor(previousColor)
        setDensity(previousDensity)
        setSize(previousSize)
        setFriction(previousFriction)


    }, [Index])


    return (

        <div className="object-properties" style={{ zIndex: Index }}>



            <span style={{fontWeight:"bold"}}>Please click apply after each selection</span>
           

            <div className="object-selectors">
                <div className="object-selector, circle" style={{ border: selectedShape == 1 ? "solid 5px " + color : 0 }} onClick={() => { setSelectedShape(1); console.log(selectedShape); objectProperties({ size: size, shape: selectedShape, gravity: 10, friction: friction, density: density, color: color }); }}></div>
                <div className="object-selector, rectangle" style={{ border: selectedShape == 2 ? "solid 5px " + color : 0 }} onClick={() => { setSelectedShape(2); console.log(selectedShape); objectProperties({ size: size, shape: selectedShape, gravity: 10, friction: friction, density: density, color: color }) }}></div>
            </div>
            <hr />

            <div className='object-property-outer'>
                <p>Size (radius/height/width)</p>
                <input type="number" onInput={function (e) { setSize(e.target.value); console.log(previousSize + "index  " + Index) }} value={size} className='object-property-input' />
            </div>

            <div className='object-property-outer'>
                <p>Density</p>
                <input type="number" value={density} onInput={(e) => { setDensity(e.target.value) }} className='object-property-input' />
            </div>

            <div className='object-property-outer'>
                <p>Friction (0-1)</p>
                <input type="number" value={friction} onInput={(e) => { setFriction(e.target.value); }} className='object-property-input' />
            </div>

            <div className='color-selector-outer'>
                <p>Color</p>
                <div onClick={() => { setColorOpen(!isColorOpen) }} className="color-preview" style={{backgroundColor:color}}></div>
                {Index == 1 && isColorOpen && <Sketch onChange={(color) => { setColor(color.hex) }} color={color} className='color-selector' />}


            </div>
            <hr />

            <button onClick={() => { objectProperties({ size: size, shape: selectedShape, gravity: 10, friction: friction, density: density, color: color }); setPrevoiousValues(color, density, size, friction) }} className='apply-button'>Apply</button>





        </div>


    );
}

export default ObjectPropertiesMenu;
