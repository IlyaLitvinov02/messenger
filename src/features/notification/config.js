import firebase from 'firebase/app'
import 'firebase/messaging';

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BOjl8mOQGFbfZ7folpqiqUm-dF7WmJicKV7UROOnNefExSP2mBGbwcMtQrtN8Ki92kEiY7N3d8iC5llMyVveKak");