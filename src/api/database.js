import firebase from 'firebase/app';
import 'firebase/database';


export const writeUserInfo = (name, email, photoURL, uid) => {
  const database = firebase.database();

  return database.ref('/usersInfo/').update({
    [uid]: {
      email,
      name,
      photoURL,
      uid
    }
  });
}