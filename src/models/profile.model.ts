import {Gallery} from "@/models/gallery.model";

export type Profile = {
    id?: string;
    pseudo: string;
    avatar: string;
    galleries: Gallery[];

    createdAt: Date;
}