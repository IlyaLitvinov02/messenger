import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth;

export const authAPI = {
    signIn: () => {
        const provider = new auth.GoogleAuthProvider();
        return auth().signInWithPopup(provider);
    },
    signOut: () => auth().signOut(),
    onAuthStateChanged: listener => auth().onAuthStateChanged(listener)
}