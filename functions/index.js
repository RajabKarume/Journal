const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const nodemailer = require("nodemailer");
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dev.tests.karume@gmail.com",
    pass: "reughtpfbzlfwjnz",
  },
});
exports.sendEmail = functions.https.onCall((data)=>{
  const message = data.message;
  const email = data.email;
  const mailOption = {
    from: "dev.tests.karume@gmail.com",
    to: email,
    subject: `entries`,
    html: `<p>${message}</p>`,
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
