import {initializeApp, FirebaseOptions} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import firebaseConfig from "../../private-key-admin.json";


function initializeFirebase() {
    const firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
    const firestore = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    return {firebaseApp, firestore, auth};
}


export const getFirebase = initializeFirebase();