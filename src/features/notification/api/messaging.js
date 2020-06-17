import firebase from 'firebase/app'
import 'firebase/messaging';

export const notificationAPI = {
    requestPermission() {
        const messaging = firebase.messaging();
        return messaging.requestPermission();
    },

    getToken() {
        const messaging = firebase.messaging();
        return messaging.getToken();
    },

    onTokenRefresh(callback) {
        const messaging = firebase.messaging();
        return messaging.onTokenRefresh(callback);
    }
} 