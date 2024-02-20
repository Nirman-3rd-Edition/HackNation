import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export const firebaseConfig = {
    apiKey: "AIzaSyBkpy0b1r0LUTPpzOm-LjkaoopdRy9Ze0U",
    authDomain: "evehunt-8e23d.firebaseapp.com",
    projectId: "evehunt-8e23d",
    storageBucket: "evehunt-8e23d.appspot.com",
    messagingSenderId: "434639982057",
    appId: "1:434639982057:web:47efbd90de8493a35d0f78",
    measurementId: "G-ZR3C0QBFLQ"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}