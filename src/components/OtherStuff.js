import {React , useState} from 'react';
import Sketch from '@uiw/react-color-sketch';

function ProjectsPanel({spawnerProperties,setSpawning}) {
  
  const[selectedBody,setSelectedBody]  = useState(1)
  const [isSpawnerPropertiesOpen,setSpawnerPropertiesOpen] = useState(false)
  const [isSpawnerColorSelectOpen,setSpawnerColorSelectOpen] = useState(false)
  const [spawnerColor,setSpawnerColor] = useState("#1ed760")
  const [spawnerClicked,setSpawnerClicked] = useState(false)
  const [spawnerSize,setSpawnerSize] = useState(10)
  const [spawnerDensity,setSpawnerDensity] = useState(0.001)
  const [spawnerFriction,setSpawnerFriction] = useState(0.1)


  
  return (
  
  <div className='project-panel'>
      <h3>Special Objects</h3>

      <p>Spawner</p>
      <div className="spawner-select">
      
        <div className="spawner" onClick={()=>{setSpawnerClicked(!spawnerClicked);setSpawning(!spawnerClicked)}} style={{border: spawnerClicked ? "2px solid white" : 0,borderRadius:"50%",height:"2vw",width:"2vw",backgroundColor:"red",margin:"0 1vw 0 1vw"}}></div>
        <div className="line" style={{height:"100%",width:"2px",backgroundColor:"white"}}></div>
        <div className="spawner-properties" style={{display: "grid", alignItems:"center"}} >

            
            <p>Spawning body</p>
            <div onClick = {()=>{setSelectedBody(1)}} style={{ border: selectedBody == 1 ? "2px solid white" : 0, borderRadius:"50%",height:"1vw",width:"1vw",backgroundColor:"red",gridColumn : "2",margin:"0 1vw 0 1vw"}} ></div>
            <div onClick = {()=>{setSelectedBody(2)}} style={{border: selectedBody == 2 ? "2px solid white" : 0,height:"1vw",width:"1vw",backgroundColor:"red",gridColumn : "3",margin:"0 1vw 0 1vw"}} ></div>
          

            
            <p>Body properties</p>
            <button onClick={()=>{setSpawnerPropertiesOpen(!isSpawnerPropertiesOpen)}} style={{marginLeft : "1vw"}} >Set</button>
            
            {isSpawnerPropertiesOpen && 
            
            <div className="spawner-properties-menu">
              
              <p style={{fontSize:"0.6vw"}} >Size</p>
              <input type= "number" style={{height:"1.3vh",width:"2vw",gridColumn : "2"}}></input>
              
              <p style={{fontSize:"0.6vw"}} >Density</p>
              <input type= "number" style={{height:"1.3vh",width:"2vw",gridColumn : "2"}}></input>
             
              <p style={{fontSize:"0.6vw"}} >Friction</p>
              <input type= "number" style={{height:"1.3vh",width:"2vw",gridColumn : "2"}}></input>
              
              <p style={{fontSize:"0.6vw"}} >Color</p>
              <div onClick={()=>{setSpawnerColorSelectOpen(!isSpawnerColorSelectOpen)}} style={{height:"1vw",width:"1vw",backgroundColor:spawnerColor,gridColumn : "2",margin:"0 1vw 0 1vw"}} ></div>
              { isSpawnerColorSelectOpen && <Sketch  onChange={(color) =>{setSpawnerColor(color.hex)}}  color={spawnerColor} style={{position:"absolute",top:"13vh",left:"4vw",zIndex:"1"}} /> }

              <button onClick={()=>{spawnerProperties({body:selectedBody,color:spawnerColor,density:spawnerDensity,friction:spawnerFriction})}} style={{paddingLeft:"0.2vw"}} >Apply</button>

            </div>
            
            }

            
          


        </div>
      </div>
  </div>
  
  );
}

export default ProjectsPanel;
