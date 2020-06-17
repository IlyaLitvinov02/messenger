importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyDSOiI97zpYXLNigUUksL4HNJn0yTd6PuU",
    authDomain: "messenger-f4132.firebaseapp.com",
    databaseURL: "https://messenger-f4132.firebaseio.com",
    projectId: "messenger-f4132",
    storageBucket: "messenger-f4132.appspot.com",
    messagingSenderId: "854411372288",
    appId: "1:854411372288:web:2d32ba4546bb68b7c2b5e5",
    measurementId: "G-4GHK8YVT56"
});


const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler((payload) => {

    const notificationTitle = 'New message';
    const notificationOptions = {
      body: '...',
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });