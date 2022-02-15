import React from 'react';

function WorldPropertiesMenu({worldProperties,stop,Index,functions}) {



  return (
  
  <div className='world-properties' style= {{zIndex:Index}} >
    <div onClick={functions["reset"]} className="reset-button">
      <p style={{margin:"5px"}}>Reset</p>
    </div>

    <div onClick = {stop} className="stop-button">
      <p style={{margin:"5px"}}>Play / Stop</p>
    </div>
    <div style={{display:"flex",alignItems:"center"}}>
      <p>Erase Mode</p>
    {/* <button onClick={erase} >Erase Object</button> */}
    <input onClick={functions["erase"]} style={{marginLeft:"20px",marginBottom:"2px"}}  type="checkbox" />
    </div>


  </div>
  
  );
}

export default WorldPropertiesMenu;
