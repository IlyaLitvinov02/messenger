import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

export const uploadUserPhoto = image => {
    const uid = firebase.auth().currentUser.uid;
    const root = firebase.storage().ref();
    const imageRef = root.child(`users/${uid}/avatars/${image.name}`);
    return imageRef.put(image);
}