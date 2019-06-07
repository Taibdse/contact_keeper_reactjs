import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAZtUa48qtGYNh-dbig_joehzDlwDHBEDw",
    authDomain: "contacts-app-11e0d.firebaseapp.com",
    databaseURL: "https://contacts-app-11e0d.firebaseio.com",
    projectId: "contacts-app-11e0d",
    storageBucket: "contacts-app-11e0d.appspot.com",
    messagingSenderId: "480366307632",
    appId: "1:480366307632:web:15878bf3a9456081"
};

const settings = {
    timestampsInSnapshots: true
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.firestore();

firebaseDB.settings(settings);

export default firebaseDB;