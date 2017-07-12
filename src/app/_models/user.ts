import { Budget } from './budget';

export class User {
    _id: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    budget: Array<Budget>;
    isAdmin: boolean;
}