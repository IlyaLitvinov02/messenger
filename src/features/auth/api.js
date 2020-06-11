import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth;

export const authAPI = {
    signUp(email, password) {
        return auth().createUserWithEmailAndPassword(email, password);
    },

    signIn(email, password) {
        return auth().signInWithEmailAndPassword(email, password);
    },

    updateUserPhoto(photoURL) {
        const user = auth().currentUser;
        return user.updateProfile({ photoURL });
    },

    updateUserName(name) {
        const user = auth().currentUser;
        return user.updateProfile({ displayName: name });
    },

    signInWithGoogle: () => {
        const provider = new auth.GoogleAuthProvider();
        return auth().signInWithPopup(provider);
    },

    signOut: () => auth().signOut(),

    onAuthStateChanged: listener => auth().onAuthStateChanged(listener),
}