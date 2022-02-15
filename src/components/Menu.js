import React,{useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Menu( { menuOpen } ) {

  const [menuHover,setMenuHover] = useState(false);

  return (

   <div className="header-menu-container">
       <ul>
           <li className="header-menu-item">Nav 1</li>
           <li className="header-menu-item">Nav 2</li>
           <li className="header-menu-item">Nav 3</li>

       </ul>
   </div>
 
 );
}

export default Menu;
