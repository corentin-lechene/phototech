import {collection, doc, Firestore, getDocs, setDoc, getDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {getFirebase} from "@/services/firebase.service";

export class FirestoreService {
    db: Firestore;
    constructor() {
        this.db = getFirebase.firestore;
    }

    async getCollection(path: string) {
        const collectionRef = collection(this.db, path);
        return getDocs(collectionRef);
    }

    async getDocument(path: string) {
        const docRef = doc(this.db, path);
        return getDoc(docRef);
    }

    async addDocument(path: string, data: any, id?: string) {
        const collectionRef = collection(this.db, path);

        let newDocRef;
        if(!id) newDocRef = doc(collectionRef);
        else newDocRef = doc(collectionRef, id);

        return setDoc(newDocRef, data);
    }

    deleteDocument(path: string) {
        const docRef = doc(this.db, path);
        return deleteDoc(docRef);
    }

    updateDocument(path: string, data: any) {
        const docRef = doc(this.db, path);
        return updateDoc(docRef, data);
    }
}