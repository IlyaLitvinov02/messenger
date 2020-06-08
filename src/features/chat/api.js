import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';



export const messagesAPI = {
    addMessage: (chatId, senderId, receiverId, messageBody) => {
        const database = firebase.database();
        const firstRef = database.ref(`users/${senderId}/messages/${chatId}`);
        const secondRef = database.ref(`users/${receiverId}/messages/${chatId}`);

        const message = {
            body: messageBody,
            senderId
        }

        const newMessageKey = firstRef.push().key;
        firstRef.update({ [newMessageKey]: message });
        secondRef.update({ [newMessageKey]: message });
    },

    subscribeOnMessages: (chatId, observer) => {
        const currentUserId = firebase.auth().currentUser.uid;
        return firebase.database().ref(`/users/${currentUserId}/messages/${chatId}`).on('value', observer);
    },

    unsubscribeOffMessages: (chatId) => {
        const currentUserId = firebase.auth().currentUser.uid;
        return firebase.database().ref(`/users/${currentUserId}/messages/${chatId}`).off('value');
    }
}