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

    async create(id: string, email: string) {
        const user: Partial<User> = {
            email: email,
            createdAt: new Date()
        };

        return this.db.addDocument(`users`, user, id);
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

    async getGalleryById(userId: string, profileId: string, galleryId: string): Promise<Required<Gallery>> {
        const gallerySnap = await this.db.getDocument(`users/${userId}/profiles/${profileId}/galleries/${galleryId}`);
        if(!gallerySnap.exists()) throw new Error("Gallery not found");
        const data = gallerySnap.data();
        return {
            id: gallerySnap.id,
            title: data.title,
            images: [],
            createdAt: data.createdAt.toDate(),
        };
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

    async getGalleriesByProfileId(userId: string, profileId: string): Promise<Required<Gallery>[]> {
        const galleriesSnap = await this.db.getCollection(`users/${userId}/profiles/${profileId}/galleries`);
        if(galleriesSnap.empty) return [];
        const galleries = galleriesSnap.docs.map(async doc => {
            const data = doc.data();
            const images = await this.getPicturesByGalleryId(userId, profileId, doc.id);
            return {
                id: doc.id,
                title: data.title,
                images: images,
                createdAt: data.createdAt.toDate(),
            } as Required<Gallery>;
        });
        return Promise.all(galleries);
    }

    async getPicturesByGalleryId(userId: string, profileId: string, galleryId: string): Promise<Required<Picture>[]> {
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

    updateGallery(userId: string, currentProfileId: string, gallery: Required<Gallery>) {
        return this.db.updateDocument(`users/${userId}/profiles/${currentProfileId}/galleries/${gallery.id}`, {
            title: gallery.title
        });
    }
}