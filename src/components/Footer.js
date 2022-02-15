import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart  } from '@fortawesome/free-solid-svg-icons';
import {faYoutube , faGithub , faReact} from '@fortawesome/free-brands-svg-icons'
// import {ReactComponent as matterjslogo} from '../matterjs.svg'
import MatterJsIcon from './matterjslogo';

function Footer() {
  return (
       <div className='footer'>
         <div className='made-with-text'>
          <p>Made with</p>
           <FontAwesomeIcon icon={faHeart} style={{paddingLeft:"10px",color:"red"}}/>
          <p style={{paddingLeft:"10px"}}>by</p>
          <a target="_blank" href="https://www.youtube.com/channel/UC07iSWDbkYGiqkvw9rmW-lw" style={{paddingLeft:"10px"}}><b>Tharusha Jayasooriya</b></a>

         </div >
         <div style={{display:"flex",width:"fit-content",height:"fit-contetnt",alignContent:"center",alignItems:"center",margin:"auto",marginLeft:"44vw"}} className=''>
           
           <p>using</p>
           <FontAwesomeIcon onClick={()=>{window.open("https://reactjs.org/",'_blank')}} style={{paddingLeft:"10px",paddingRight:"15px",cursor:"pointer"}} icon={faReact} size='lg' color = "rgb(94, 211, 243)"/>
            {/* <img src={matterjslogo} alt="test" style={{height:"20px"}}/> */}
           <p>&</p>
            
            <MatterJsIcon />
         
         </div>
        

         <div className="socials" style={{paddingBottom:"10px"}}>
         <FontAwesomeIcon onClick={()=>{window.open("https://www.youtube.com/channel/UC07iSWDbkYGiqkvw9rmW-lw",'_blank')}} style={{cursor:"pointer"}} icon={faYoutube} color="red" size='lg' />
         <FontAwesomeIcon onClick={()=>{window.open("https://github.com/Tharusha-dev",'_blank')}} icon={faGithub} color="black" size='lg' style={{paddingLeft:"20px",cursor:"pointer"}}/>




        </div>

          <a target="_blank" href="" style={{color:"blue"}} >Find this website on GitHub</a>


       </div>
       
       );
}

export default Footer;
