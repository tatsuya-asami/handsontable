const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
exports.test = functions.https.onRequest((request, response) => {
  // if (request.method === "GET") {
  //   response.send("test from Firebase!");
  // }
  const sendData = ["test from Firebase!", "プリプリ〜", "当たり！"];
  const random = Math.floor(Math.random() * 3);
  response.send(sendData[random]);
});
exports.oncall = functions.https.onCall((data, context) => {
  return "test";
});

// exports.updateUser = functions.firestore
//   .document("test1/table")
//   .onWrite((change, context) => {
//     change.send("aa");
//     context.send("bb");
//   });

// exports.test = functions.https.onRequest(req, res) => {
//   if(req) {
//     return
//   }
//   res.send("test")
// }
