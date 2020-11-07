import firebase from 'firebase/app'
import 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBRzQXck0E5irNXg2F0FWLQC4JXghgWw0A",
    authDomain: "react-fb-crud-9593a.firebaseapp.com",
    databaseURL: "https://react-fb-crud-9593a.firebaseio.com",
    projectId: "react-fb-crud-9593a",
    storageBucket: "react-fb-crud-9593a.appspot.com",
    messagingSenderId: "614443754992",
    appId: "1:614443754992:web:6063b4cbc68263df956935",
    measurementId: "G-JN1W6K807D"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const db = fb.firestore();
export default db;