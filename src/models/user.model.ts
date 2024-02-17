import {Profile} from "@/models/profile.model";

export type User = {
    id?: string;
    email: string;

    profiles: Required<Profile>[];

    createdAt: Date;
};