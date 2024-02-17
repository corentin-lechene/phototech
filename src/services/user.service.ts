import {FirestoreService} from "@/services/firestore.service";
import {Profile} from "@/models/profile.model";
import {User} from "@/models/user.model";
import {Gallery} from "@/models/gallery.model";
import {Picture} from "@/models";

export class UserService {
    db: FirestoreService;
    constructor() {
        this.db = new FirestoreService();
    }

    async create() {
        const user: Partial<User> = {
            email: "c.lech@fiters.co",
            createdAt: new Date()
        };
        return this.db.addDocument("users", user);
    }

    async getByUserId(userId: string): Promise<User> {
        const userSnap = await this.db.getDocument(`users/${userId}`);
        if(!userSnap.exists()) throw new Error("User not found");
        const profiles = await this.getProfilesByUserId(userId);
        const data = userSnap.data();
        return {
            id: userSnap.id,
            email: data.email,
            profiles: profiles,
            createdAt: data.createdAt.toDate()
        };
    }

    async addProfile(userId: string, profile: Partial<Profile>) {
        return this.db.addDocument(`users/${userId}/profiles`, {
            ...profile,
            createdAt: new Date()
        });
    }

    async getProfilesByUserId(userId: string): Promise<Required<Profile>[]> {
        const usersSnap = await this.db.getCollection(`users/${userId}/profiles`);
        if(usersSnap.empty) return [];
        return usersSnap.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                avatar: data.avatar,
                pseudo: data.pseudo,
                galleries: [],
                createdAt: data.createdAt.toDate(),
            };
        });
    }

    async getGalleriesByProfileId(userId: string, profileId: string) {
        const galleriesSnap = await this.db.getCollection(`users/${userId}/profiles/${profileId}/galleries`);
        if(galleriesSnap.empty) return [];
        return galleriesSnap.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                images: [],
                createdAt: data.createdAt.toDate(),
            };
        });
    }

    async getPicturesByGalleryId(userId: string, profileId: string, galleryId: string) {
        const picturesSnap = await this.db.getCollection(`users/${userId}/profiles/${profileId}/galleries/${galleryId}/pictures`);
        if(picturesSnap.empty) return [];
        return picturesSnap.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                url: data.url,
                createdAt: data.createdAt.toDate(),
            };
        });
    }

    async addGallery(userId: string, profileId: string, gallery: Partial<Gallery>) {
        return this.db.addDocument(`users/${userId}/profiles/${profileId}/galleries`, {
            ...gallery,
            createdAt: new Date()
        });
    }

    async addPicture(userId: string, profileId: string, galleryId: string, picture: Partial<Picture>) {
        return this.db.addDocument(`users/${userId}/profiles/${profileId}/galleries/${galleryId}/pictures`, {
            ...picture,
            createdAt: new Date()
        });
    }

    deleteGallery(currentUserId: string, currentProfileId: string, galleryId: string) {
        return this.db.deleteDocument(`users/${currentUserId}/profiles/${currentProfileId}/galleries/${galleryId}`);
    }

    deletePicture(currentUserId: string, currentProfileId: string, value: string, pictureId: string) {
        return this.db.deleteDocument(`users/${currentUserId}/profiles/${currentProfileId}/galleries/${value}/pictures/${pictureId}`);
    }
}