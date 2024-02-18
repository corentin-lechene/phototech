import {getFirebase} from "@/services/firebase.service";
import {FirebaseStorage, ref, listAll, getDownloadURL} from "firebase/storage";


export class AvatarService {
    storage: FirebaseStorage;
    constructor() {
        this.storage = getFirebase.storage;
    }

    async getAvatars(): Promise<{name: string, url: string}[]> {
        const avatarRef = ref(this.storage, 'avatars');
        const avatars = await listAll(avatarRef);
        return Promise.all(avatars.items.map(async item => {
            const url = await getDownloadURL(item);
            return {name: item.name, url};
        }));
    }
}