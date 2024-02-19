import {initializeApp, FirebaseOptions} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import firebaseConfig from "../../private-key-admin.json";
import {getStorage} from "firebase/storage";


function initializeFirebase() {
    const firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
    const firestore = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);
    return {firebaseApp, firestore, auth, storage};
}


export const getFirebase = initializeFirebase();