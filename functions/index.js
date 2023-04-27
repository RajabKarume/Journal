const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
const axios = require("axios");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dev.tests.karume@gmail.com",
    pass: "vshkgfzbheijorvd",
  },
});

exports.addEntries = functions.https.onRequest(async (req, res) =>{
  cors(req, res, async () => {
    try {
      const {email, newEntry} = req.body;
      const entriesRef = admin.firestore().collection("entries");
      const newEntryRef = await entriesRef.add({email, newEntry});
      res.send({id: newEntryRef.id});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding entry to Firestore");
    }
  });
});

exports.getEntries = functions.https.onRequest( async (req, res) => {
  cors(req, res, async () => {
    try {
      const db = admin.firestore();
      db.collection("entries")
          .get()
          .then((querySnapshot) => {
            const entries = [];
            querySnapshot.forEach((doc) => {
              entries.push(doc.data());
            });
            res.json(entries);
          });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
});

exports.sendEmail = functions.pubsub.schedule("every day 23:30")
    .onRun(async (context) => {
      try {
        const response = await axios.get("https://us-central1-journal-6a69e.cloudfunctions.net/getEntries");
        const allEntries = response.data;
        const newData = {};
        allEntries.forEach(({newEntry, email}) => {
          if (!newData[email]) {
            newData[email] = {email, newEntries: []};
          }
          allEntries.forEach(({newEntry: ne, email: e}) =>{
            if (email !== e && newEntry === ne) {
              newData[email].newEntries.push(newEntry);
            }
          });
        });
        const myData = Object.values(newData)
            .map(({email, newEntries}) => {
              const filterEntry = allEntries
                  .filter(({newEntry, email: e}) =>
                    email !==e && !newEntries.includes(newEntry));
              return {email, newEntries: filterEntry.map(({newEntry}) =>
                newEntry)};
            });
        const message = myData.map((data) => data.newEntries);
        const email = myData.map((data) => data.email);
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
      } catch (error) {
        console.error(error);
      }
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
