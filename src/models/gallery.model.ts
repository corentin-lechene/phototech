import {Picture} from "@/models/picture.model";

export type Gallery = {
    id?: string;
    title: string;

    images: Picture[];

    createdAt: Date;
};