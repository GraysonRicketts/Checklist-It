import { Template } from "./Template";
import { Checklist } from "./Checklist";

export type User = {
    email: string,
    password: string,
    templates: Template[],
    checklists: Checklist[]
}

type UserInput = {
    email: string;
    password: string;
}

export default class UserModel {
    private users: User[];
    private nextId: number;

    constructor() {
        this.users = [];
        this.nextId = 1;
    }

    findOne(email: string): User | void {
        // TOOD: make DB call
        return this.users.find(u => u.email === email);
    }

    getNextId(): string {
        return (this.nextId++).toString();
    }

    insertOne(partialUser: UserInput): User {
        const { email, password } = partialUser;
        const user: User = {
            email,
            password,
            templates: [],
            checklists: []
        }

        // TODO: make DB call
        this.users.push(user);

        return user;
    }
}