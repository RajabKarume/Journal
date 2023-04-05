const functions = require("firebase-functions");
const admin = require("firebase-admin");


admin.initializeApp();
const nodemailer = require("nodemailer");
// const { error } = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_PASSWORD,
  },
});

exports.sendEmail = functions.firestore
    .document(`entries/{entryId}`)
    .onCreate((snap, context)=>{
      const mailOption = {
        from: process.env.REACT_APP_EMAIL,
        to: snap.data().email,
        subject: `entries`,
        html: `<p>${snap.data().newEntry}</p>`,
      };
      return transporter.sendMail(mailOption, (error, data)=>{
        if (error) {
          console.log(error);
          return;
        }
        console.log("Sent");
      });
    });

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
