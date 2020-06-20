import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


export const chatsAPI = {
    createChatInfo(firstUser, secondUser) {
        if (firstUser.uid !== secondUser.uid) {
            const database = firebase.database();
            const firstRef = database.ref(`users/${firstUser.uid}/chats`);
            const secondRef = database.ref(`users/${secondUser.uid}/chats`);
            const timestamp = Date.now();

            //create chat instance for each user

            const firstUserChat = {
                title: secondUser.name,
                photoURL: secondUser.photoURL,
                lastMessage: null,
                newMessagesCount: 0,
                companionId: secondUser.uid,
                timestamp
            }

            const secondUserChat = {
                title: firstUser.name,
                photoURL: firstUser.photoURL,
                lastMessage: null,
                newMessagesCount: 0,
                companionId: firstUser.uid,
                timestamp
            }

            const newChatKey = firstRef.push().key;
            firstRef.update({ [newChatKey]: firstUserChat });
            secondRef.update({ [newChatKey]: secondUserChat });
        } else {
            throw new Error('You cannot start chat with yourself');
        }
    },

    subscribeOnChats(observer) {
        const currentUserId = firebase.auth().currentUser.uid;
        return firebase.database()
            .ref(`/users/${currentUserId}/chats`)
            .orderByChild('timestamp')
            .on('value', observer);
    },

    unsubscribeOffChats(currentUserId) {
        return firebase.database()
            .ref(`/users/${currentUserId}/chats`)
            .off('value');
    },

    updateLastMessageAndTimestamp(chatId, receiverId, messageBody) {
        const database = firebase.database();
        const currentUserId = firebase.auth().currentUser.uid;

        const timestamp = Date.now()

        database.ref('users/').update({
            [`${currentUserId}/chats/${chatId}/lastMessage`]: `You: ${messageBody}`,
            [`${currentUserId}/chats/${chatId}/timestamp`]: timestamp,

            [`${receiverId}/chats/${chatId}/lastMessage`]: messageBody,
            [`${receiverId}/chats/${chatId}/timestamp`]: timestamp
        });
    },

    increaseNewMessagesCount(chatId, receiverId) {
        const database = firebase.database();

        //increase newMessagesCount for message receiver
        database
            .ref(`users/${receiverId}/chats/${chatId}/newMessagesCount`)
            .transaction(count => count + 1);
    },

    resetNewMessagesCount(chatId) {
        const database = firebase.database();
        const currentUserId = firebase.auth().currentUser.uid;

        //reset my newMessagesCount to 0
        database
            .ref(`users/${currentUserId}/chats/${chatId}/newMessagesCount`)
            .set(0);
    },

    setIsTyping(chatId, receiverId, isTyping) {
        const database = firebase.database();

        return database
            .ref(`users/${receiverId}/chats/${chatId}/isCompanionTyping`)
            .set(isTyping);
    }
}