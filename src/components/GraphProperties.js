import React from 'react';

function GraphProperties({graphSelect,Index}) {
  return (

  <div className="graph-properties">

    <button onClick={()=>{graphSelect();console.log("wah")}} className="select-body-graph-button" >Select a body to graph</button>


  </div>
  
  
  );
}

export default GraphProperties;
