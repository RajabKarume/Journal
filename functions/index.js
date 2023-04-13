const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});

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
exports.addEntries = functions.https.onRequest(async (req, res) =>{
  cors(req, res, async () => {
    try {
      // Get the data from the request body
      const {email, newEntry} = req.body;
      const entriesRef = admin.firestore().collection("entries");
      const newEntryRef = await entriesRef.add({email, newEntry});

      // Send a response with the ID of the new document
      res.send({id: newEntryRef.id});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding entry to Firestore");
    }
  });
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
exports.getEntries = functions.pubsub.schedule("every day 23:00")
    .onRun( async (context) => {
      const entrieRef = admin.firestore().collection("entries");
      const entriesSnapshot = await entrieRef.get();
      console.log(entriesSnapshot.size);
      const entries = entriesSnapshot.docs.map((doc) => (
        doc.data()));
      console.log(entries);
    });
exports.deleteCollection = functions.pubsub.schedule("every day 00:00")
    .onRun(async (context) => {
      const collectionRef = admin.firestore().collection("entries");
      const batchSize = 500;
      try {
        const query = collectionRef.orderBy("__name__").limit(batchSize);
        let snapshot = await query.get();

        while (snapshot.size > 0) {
          const batch = admin.firestore().batch();
          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
          });

          await batch.commit();
          snapshot = await query.get();
        }

        console.log("All documents deleted");
      } catch (error) {
        console.error(error);
      }
    });

