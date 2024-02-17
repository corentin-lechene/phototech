import {Auth, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {UserService} from "@/services/user.service";
import {User} from '@/models';
import {useUserStore} from "@/store/user.store";

export class AuthService {
    auth: Auth
    userService: UserService

    constructor() {
        this.auth = getAuth();
        this.userService = new UserService();
    }

    isLoggedIn(): boolean {
        return this.auth.currentUser !== null;
    }

    async signIn(mail: string, password: string) {
        await signInWithEmailAndPassword(this.auth, mail, password);
        await this.storeUser();
    }

    async storeUser() {
        if (this.isLoggedIn() && this.auth.currentUser) {
            const user = await this.userService.getByUserId(this.auth.currentUser.uid);
            const userStore = useUserStore();
            userStore.setUser(user as Required<User>);
        } else {
            throw new Error("not connected")!
        }
    }

    async signOut(): Promise<void> {
        await signOut(this.auth);
    }
}