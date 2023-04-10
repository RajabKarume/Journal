import React from "react";
import './SendEmail.css'

function SendEmail({ sendMail, setSendMail}){

    return (sendMail) ? (
        <div className="popup">
            <div className="popup-container">
              <p>Entry submited successfully</p>
              <button onClick={()=>setSendMail(false)}>OK</button>
            </div>
        </div>
    ):''
}

export default SendEmail