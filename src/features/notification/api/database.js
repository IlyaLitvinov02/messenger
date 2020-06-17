import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth'

export const setPushToken = token => {
    const uid = firebase.auth().currentUser.uid;
    const database = firebase.database();
    return database
        .ref(`users/${uid}/pushToken`)
        .set(token);
}