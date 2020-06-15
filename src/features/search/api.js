import firebase from 'firebase/app';
import 'firebase/database';


export const getUsersByName = term => {
    return firebase.database()
        .ref('usersInfo/')
        .orderByChild('name')
        .startAt(term)
        .endAt(`${term}\uf8ff`)
        .once('value');
}

export const getUsersByEmail = term => {
    return firebase.database()
        .ref('usersInfo/')
        .orderByChild('email')
        .equalTo(term)
        .once('value');
}