import{ React , useState , useEffect} from 'react';
import Sketch from '@uiw/react-color-sketch';

function ObjectPropertiesMenu({objectProperties,Index}) {



    const [selectedShape, setSelectedShape] = useState(1);

    const [color,setColor] = useState("#1ed760");
    const [previousColor,setPreviousColor] = useState("#1ed760");

    const [isApplied,setApplied] = useState(false);

    let [density,setDensity] = useState(0.001);
    let [previousDensity,setPreviousDensity] = useState(0.001);

    let [size,setSize] = useState(40);
    let [previousSize,setPreviousSize] = useState(40);

    let [friction,setFriction] = useState(0.1);
    let [previousFriction,setPreviousFriction] = useState(0.1);

    let [isColorOpen,setColorOpen] = useState(false);

    const setPrevoiousValues = function(pColor,pDensity,pSize,pFriction){
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
        
            
    },[Index])


    return (
    
    <div className="object-properties" style={{zIndex:Index}}>


            {/* {Index == 0 && setSize(previousSize)} */}

            <p>Double click to select shape (after aplying other parameters)</p>

            <div style={{display : 'flex'}}>
            <div className="circle , object-selector" style={{border:selectedShape == 1 ? "solid 5px "+color : 0}} onClick={() => {setSelectedShape(1);console.log(selectedShape);objectProperties({size:size,shape:selectedShape,gravity:10,friction:friction,density:density,color:color});}}></div>
            <div className="rectangle , object-selector" style={{border:selectedShape == 2 ? "solid 5px "+color : 0}} onClick={() => {setSelectedShape(2);console.log(selectedShape);objectProperties({size:size,shape:selectedShape,gravity:10,friction:friction,density:density,color:color})}}></div>
            </div>

            <hr/>

            <div style={{display : 'flex',marginTop:'3px'}}>
            <p>Size (radius/height/width)</p>
            <input type="number"   onInput={function(e){setSize(e.target.value);console.log(previousSize+"index  "+Index)}} value={size} style ={{height:'20px',width:'50px',marginTop:'auto',marginBottom :'auto',marginLeft:'10px'}} />
            </div>

            <div style={{display : 'flex',marginTop:'3px'}}>
            <p>Density</p>
            <input type="number" value={density}  onInput={(e) => {setDensity(e.target.value)}} style ={{height:'20px',width:'50px',marginTop:'auto',marginBottom :'auto',marginLeft:'10px'}} />
            </div>

            <div style={{display : 'flex',marginTop:'3px'}}>
            <p>Friction (0-1)</p>
            <input type="number" value={friction} onInput={(e) => {setFriction(e.target.value);}} style ={{height:'20px',width:'50px',marginTop:'auto',marginBottom :'auto',marginLeft:'10px'}} />
            </div>

            <div style={{position:"relative",display : 'flex',marginTop:'5px',alignItems:"center"}}>
            <p>Color</p>
            <div onClick={() => {setColorOpen(!isColorOpen)}} style={{marginLeft:"10px",height:"20px",width:"20px",backgroundColor:color}} className="display-color"></div>
            {Index == 1 && isColorOpen && <Sketch onChange={(color) =>{setColor(color.hex)}} color={color} style={{zIndex:"2",top:"0",left:"100px",position:"absolute",color:"red"}}/>}
            

            </div>

            <button onClick={()=>{objectProperties({size:size,shape:selectedShape,gravity:10,friction:friction,density:density,color:color});setPrevoiousValues(color,density,size,friction)}}>Apply</button>

            
    </div>
    
    );
}

export default ObjectPropertiesMenu;
