//- ./src/interfaces/specialist.ts

import { IUser } from "./user";

export interface IInsurance {
    completed: string;
    pending: string;
    licensing: string;
    status: string;
}

export interface ITakaful {
    completed: string;
    pending: string;
    licensing: string;
    status: string;
}

export interface ISpecialist {
    _id: string;
    name: string;
    image: string;
    email: string;
    designation: string;
    region: string;
    branch: string;
    insurance: IInsurance;
    takaful: ITakaful;
    user: IUser; 
}