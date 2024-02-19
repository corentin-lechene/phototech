import {defineStore} from "pinia";
import {Profile, User} from "@/models";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null as Required<User> | null,
            profile: null as Required<Profile> | null,
        }
    },
    getters: {
        currentUser(state) {
            return state.user as Required<User>;
        },
        currentProfile(state) {
            return state.profile as Required<Profile>;
        },
        isLoggedIn: (state) => !!state.user
    },
    actions: {
        setCurrentProfile(profile: Required<Profile>) {
            this.profile = profile;
        },
        setUser(user: Required<User>) {
            this.user = user;
        },
        logout() {
            this.user = null;
            this.profile = null;
        }
    },
    persist: true,
})