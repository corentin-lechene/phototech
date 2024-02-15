import {defineStore} from "pinia";
import {User} from "@/models/user.model";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null as Required<User> | null, //le required c'est parce que id est null de base
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user, // simple way to check if user is logged in
    },
    actions: {
        setUser(user: Required<User>) {
            this.user = user;
        },
        logout() {
            this.user = null;
        }
    }
})