import firebase from 'firebase/app';
import 'firebase/database';



export const getUsersByTerm = term => {
    return firebase.database()
        .ref('usersInfo/')
        .orderByChild('name')
        .equalTo(term)
        .once('value');
}
