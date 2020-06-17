const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.sendNotification =
    functions.database
        .ref('users/{userId}/messages/{chatId}/{messageId}')
        .onWrite(async (snapshot, context) => {

            const { body, senderId } = snapshot.after.val();
            const { userId, chatId } = context.params;
            if (userId === senderId) return;

            const tokenSnap = await admin.database().ref(`users/${userId}/pushToken`).once('value');
            const token = tokenSnap.val();

            const chatSnap = await admin.database().ref(`users/${userId}/chats/${chatId}`).once('value');
            const { title } = chatSnap.val();


            const message = {
                "token": token,
                "notification": {
                    "title": title,
                    "body": body || "Photo",
                }
            }

            return admin.messaging().send(message);
        });