import {Auth, getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {UserService} from "@/services/user.service";
import {User} from '@/models';
import {useUserStore} from "@/stores/user.store";

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

    async signUp(mail: string, password: string, conditionsChecked: boolean) {
        if(!mail.trim() || !password.trim()) {
            throw new Error("auth/empty-fields");
        }

        if(!conditionsChecked) {
            throw new Error("auth/conditions-not-checked");
        }

        const credential = await createUserWithEmailAndPassword(this.auth, mail, password);
        if(credential.user.email) {
            await this.userService.create(credential.user.uid, credential.user.email)
            await this.storeUser();
        }

    }

    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(this.auth, provider);

        try {
            await this.userService.getByUserId(credential.user.uid);
        } catch (e) {
            if (credential.user.email) {
                await this.userService.create(credential.user.uid, credential.user.email)
            }
        }

        await this.storeUser();
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
        const userStore = useUserStore();
        userStore.logout();
    }
}