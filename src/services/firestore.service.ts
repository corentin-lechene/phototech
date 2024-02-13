import {collection, doc, Firestore, getDocs, getFirestore, setDoc, getDoc} from "firebase/firestore";

export class FirestoreService {
    db: Firestore;
    constructor() {
        this.db = getFirestore();
    }

    async getCollection(path: string) {
        const collectionRef = collection(this.db, path);
        return getDocs(collectionRef);
    }

    async getDocument(path: string) {
        const docRef = doc(this.db, path);
        return getDoc(docRef);
    }

    async addDocument(path: string, data: any) {
        const collectionRef = collection(this.db, path);
        const newDocRef = doc(collectionRef);
        return setDoc(newDocRef, data);
    }
}