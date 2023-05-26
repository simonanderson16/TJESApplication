import React from 'react'
import './Popups.css'
//src: https://www.youtube.com/watch?v=i8fAO_zyFAM&t=618s
function Popups(props) {
  return (props.trigger) ? (
    <div className = "popup">
        <div className = "popup-inner">
            <button className = "close-btn" onClick={()=>props.setTrigger(false)}> Cancel </button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Popups