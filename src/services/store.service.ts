import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: '',
            profileId: ''
        }
    },
    getters: {
        currentUserId: (state) => state.id,
        currentProfileId: (state) => state.profileId,
    },
    actions: {
        setUserId(id: string) {
            this.id = id;
        },

        setUserProfile(id: string) {
            this.profileId = id;
        },

        clear() {
            this.id = '';
            this.profileId = '';
        }

    }
})