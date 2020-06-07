import firebase from 'firebase/app';
import 'firebase/database';



export const writeUserInfo = (name, email, photoURL, uid) => {
  const database = firebase.database();

  return database.ref('/users/usersInfo/').update({
    [name + uid]: {
      email,
      name,
      photoURL,
      uid
    }
  });
}

export const getUsersByTerm = term => {
    return firebase.database()
      .ref('users/usersInfo')
      .orderByKey()
      .startAt(term)
      .once('value');
}