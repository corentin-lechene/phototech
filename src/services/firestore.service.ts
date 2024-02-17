import {collection, doc, Firestore, getDocs, getFirestore, setDoc, getDoc, deleteDoc} from "firebase/firestore";

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
}