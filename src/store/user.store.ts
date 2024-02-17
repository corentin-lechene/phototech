import {defineStore} from "pinia";
import {User} from "@/models";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null as Required<User> | null,
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user
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