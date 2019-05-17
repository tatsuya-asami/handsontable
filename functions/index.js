const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
exports.test = functions.https.onRequest((request, response) => {
  if (!request) {
    return;
  }
  response.send("test from Firebase!");
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
