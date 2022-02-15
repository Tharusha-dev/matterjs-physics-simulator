import React, {useState} from 'react';
import ObjectPropertiesMenu from './ObjectPropertiesMenu';
import WorldPropertiesMenu from './WorldPropertiesMenu';

function PropertiesMenu({objectProperties,worldProperties,resetScene,functions}) {
    const [tabOpen, setOpenTab] = useState(2);


  return (
  
  <div className='properties-menu'>

      <div className="proprty-tabs-pane">

          <div className="property-tab-button" style = {
              {backgroundColor: tabOpen == 1 ? 'rgb(80, 79, 79)' : 'rgb(53, 53, 53)', borderBottom : tabOpen == 1 ? 0 : '2px solid black'}} 
              onClick= {() => {setOpenTab(1)}}>World Properties</div>

          <div className="property-tab-button" style = {
              {backgroundColor: tabOpen == 2 ? 'rgb(80, 79, 79)' : 'rgb(53, 53, 53)', borderBottom : tabOpen == 2 ? 0 : '2px solid black'}} 
              onClick= {() => {setOpenTab(2)}}>Object Properties</div>

      </div>

     <div className="property-tab">
 
      <ObjectPropertiesMenu Index = {tabOpen == 2 ? 1 : 0} objectProperties={objectProperties}/>
        <WorldPropertiesMenu Index = {tabOpen  == 1 ? 1 : 0} functions={functions} resetScene={resetScene} worldProperties={worldProperties}/>



     </div>
     
  </div>
  
  );
}

export default PropertiesMenu;
