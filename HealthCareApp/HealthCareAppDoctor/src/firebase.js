import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyAzhzhSXlP22snu3FxCgPLrd1LfS7xTmAc",
    authDomain: "bookingcareapp.firebaseapp.com",
    projectId: "bookingcareapp",
    storageBucket: "bookingcareapp.appspot.com",
    messagingSenderId: "400839917031",
    appId: "1:400839917031:web:4247bfabf59c5522e61142",
    measurementId: "G-MDF9HWLKEP"
};


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
