import React from "react";
import './PopupMessage.css'

function PopupMessage({ sendMail, setSendMail, message}){

    return (sendMail) ? (
        <div className="popup">
            <div className="popup-container">
              <p>{message}</p>
              <button onClick={()=>setSendMail(false)}>OK</button>
            </div>
        </div>
    ):''
}

export default PopupMessage