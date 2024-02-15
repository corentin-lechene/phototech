import {User, onAuthStateChanged, UserCredential, getAuth, signInWithEmailAndPassword, signOut, Auth, } from 'firebase/auth';
import {useUserStore} from "@/services/store.service";
import {UserService} from "@/services/user.service";

export class AuthService {
    auth: Auth
    userService: UserService

    constructor() {
        this.auth = getAuth();
        this.userService = new UserService();
    }

    async isLoggedIn(): Promise<boolean> {
        return this.auth.currentUser !== null;
    }

    async signIn(mail: string, password: string) {
        const currentUser = await signInWithEmailAndPassword(this.auth, mail, password);
        // fetch user in database
        const user = await this.userService.getByUserId(currentUser.user.uid);

        // store user in store.

        const userStore = useUserStore();
        userStore.setUser(user);
    }


    async signOut(): Promise<void> {
        await signOut(this.auth);
    }
}