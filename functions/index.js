const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.sendNotification =
    functions.database
        .ref('users/{userId}/messages/{chatId}/{messageId}')
        .onWrite(async (snapshot, context) => {

            const { body, senderId, imageUrl } = snapshot.after.val();
            const { userId, chatId } = context.params;
            if (userId === senderId) return;

            const messageBody =
                body
                    ? body.blocks
                        .map(block => block.text !== undefined ? block.text : '')
                        .reduce((previousText, currentText) => previousText + ' ' + currentText)
                    : undefined;


            const tokenSnap = await admin.database().ref(`users/${userId}/pushToken`).once('value');
            const token = tokenSnap.val();

            const chatSnap = await admin.database().ref(`users/${userId}/chats/${chatId}`).once('value');
            const { title } = chatSnap.val();


            const message = {
                "token": token,
                "notification": {
                    "title": title,
                    "body": messageBody
                        ? messageBody
                        : imageUrl
                            ? "Photo"
                            : "An empty message",
                }
            }

            return admin.messaging().send(message);
        });