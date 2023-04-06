import React from "react";
import './SendEmail.css'
// import 'node-libs-browser';
// import nodemailer from 'nodemailer';
// import { Mailer } from 'nodemailer-react'


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