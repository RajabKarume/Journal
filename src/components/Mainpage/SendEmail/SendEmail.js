import React from "react";
import './SendEmail.css'
// import 'node-libs-browser';
// import nodemailer from 'nodemailer';
// import { Mailer } from 'nodemailer-react'


function SendEmail({otherEmails, myEntries, sendMail, setSendMail}){

  // const nodemailer = require('nodemailer')
  // let mailTransport = nodemailer.createTransport({
  // service: 'gmail',
  // host: 'smtp.example.com',
  // secure: true,
  // auth:{
  //   user: process.env.REACT_APP_EMAIL,
  //   pass: process.env.REACT_APP_PASSWORD
  // }
  // })

  const entry = myEntries.map((entries)=> entries)
  console.log(entry)

    return (sendMail) ? (
        <div className="popup">
            <div className="popup-container">
              <p>Entry submited successfully</p>
            </div>
        </div>
    ):''
}

export default SendEmail