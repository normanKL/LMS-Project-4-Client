//- ./src/interfaces/user.ts

export interface IUser {
    _id: string;
    username: string;
    email: string;
    image_url: string;
    country: string;     
    quote: string;       
    first_name: string;
    last_name: string;
    password: string;
    password_confirmation: string;
  }