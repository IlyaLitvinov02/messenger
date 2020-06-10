import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';



export const messagesAPI = {
    addMessage: (chatId, receiverId, messageBody) => {
        const database = firebase.database();
        const currentUserId = firebase.auth().currentUser.uid;
        const firstRef = database.ref(`users/${currentUserId}/messages/${chatId}`);
        const secondRef = database.ref(`users/${receiverId}/messages/${chatId}`);

        const message = {
            body: messageBody,
            senderId: currentUserId
        }

        const newMessageKey = firstRef.push().key;
        firstRef.update({ [newMessageKey]: message });
        secondRef.update({ [newMessageKey]: message });
    },

    subscribeOnMessages(chatId, observer) {
        const currentUserId = firebase.auth().currentUser.uid;
        return firebase.database().ref(`/users/${currentUserId}/messages/${chatId}`).on('value', observer);
    },

    unsubscribeOffMessages(chatId) {
        const currentUserId = firebase.auth().currentUser.uid;
        return firebase.database().ref(`/users/${currentUserId}/messages/${chatId}`).off('value');
    }
}