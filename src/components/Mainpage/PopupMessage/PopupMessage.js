import React from "react";
import './PopupMessage.css'
import Button from "../../Button/Button";

function PopupMessage({ sendMail, setSendMail, message}){

    return (sendMail) ? (
        <div className="popup">
            <div className="popup-container">
              <p>{message}</p>
              <Button handleClick={()=>setSendMail(false)} buttonText={"Ok"} />
            </div>
        </div>
    ):''
}

export default PopupMessage