//- ./src/interfaces/user.ts

export interface IUser {
    _id: string;
    username: string;
    email: string;
    image: string;
    designation: string;
    region: string;
    branch: string;
  }