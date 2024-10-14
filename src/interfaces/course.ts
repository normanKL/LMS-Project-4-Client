//- ./src/interfaces/course.ts
import { IUser } from "./user";

export interface IAuthor{
    id: string;
    name: string;
    image_url: string;
    email: string;
}

export interface ICourse {
    id: string;
    image_url: string;
    title: string;
    link: string;
    author: IAuthor | string;
    description: string;
    created_at: string;
    owner: IUser;
    comments: IComment[];
}

export interface IComment {
    id: string; // Adjust type as needed
    text: string;
    created_at: string; // Or Date if you are using Date objects
    owner: {
        id: string;
        username: string;
        role?: string;
    };
}


