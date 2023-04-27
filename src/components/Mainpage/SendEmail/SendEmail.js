import React from "react";
import './SendEmail.css'

function SendEmail({ sendMail, setSendMail, message}){

    return (sendMail) ? (
        <div className="popup">
            <div className="popup-container">
              <p>{message}</p>
              <button onClick={()=>setSendMail(false)}>OK</button>
            </div>
        </div>
    ):''
}

export default SendEmail