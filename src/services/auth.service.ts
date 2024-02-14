import {User, onAuthStateChanged, UserCredential, getAuth, signInWithEmailAndPassword, signOut, Auth} from 'firebase/auth';
import {useUserStore} from "@/services/store.service";

export class AuthService {
    auth: Auth

    constructor() {
        this.auth = getAuth();
    }

    async isLoggedIn(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user: User | null) => {
                unsubscribe(); // Arrête d'écouter les changements d'état après avoir obtenu la première réponse
                if (user !== null) {
                    useUserStore().setUserId(user.uid);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    async signIn(mail: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(this.auth, mail, password);
    }


    async signOut(): Promise<void> {
        await signOut(this.auth);
    }
}