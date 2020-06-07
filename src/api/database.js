import firebase from 'firebase/app';
import 'firebase/database';



export const writeUserInfo = (name, email, photoURL, uid) => {
  const database = firebase.database();

  return database.ref('/users/usersInfo/').update({
    [uid]: {
      email,
      name,
      photoURL,
      uid
    }
  });
}

export const getUsersByTerm = term => {
  return firebase.database()
    .ref('users/usersInfo/')
    .orderByChild('name')
    .equalTo(term)
    .once('value');
}



export const createChatInfo = (firstUser, secondUser) => {
  if (firstUser.uid !== secondUser.uid) {
    const database = firebase.database();
    const firstRef = database.ref(`users/${firstUser.uid}/chats`);
    const secondRef = database.ref(`users/${secondUser.uid}/chats`);


    //create chat instance for each user

    const firstUserChat = {
      title: secondUser.name,
      photoURL: secondUser.photoURL,
      lastMessage: null,
      newMessagesCount: 0,
      companionId: secondUser.uid
    }

    const secondUserChat = {
      title: firstUser.name,
      photoURL: firstUser.photoURL,
      lastMessage: null,
      newMessagesCount: 0,
      companionId: firstUser.uid
    }

    const newChatKey = firstRef.push().key;
    firstRef.update({ [newChatKey]: firstUserChat });
    secondRef.update({ [newChatKey]: secondUserChat });
  } else {
    throw new Error('You cannot start chatting with yourself');
  }
}


export const subscribeOnMyChats = observer => {
  const currentUserId = firebase.auth().currentUser.uid;
  return firebase.database().ref(`/users/${currentUserId}/chats`).on('value', observer);
}


export const addMessage = (chatId, senderId, receiverId, messageBody) => {
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
}