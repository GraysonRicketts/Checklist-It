import { Template } from './Template';
import { Checklist } from './Checklist';

const nextId = 1;
function getNextId(): string {
    return (this.nextId++).toString();
}

export class User {
    public id: string;
    public email: string;
    private password: string;
    public templates: Template[];
    public checklists: Checklist[];

    constructor(id: string, email: string, password: string) {
        this.id = getNextId();
        this.templates = [];
        this.checklists = [];
    }

    verifyPassword(password: string) {
        return password === this.password;
    }
}

type UserInput = {
    email: string;
    password: string;
}

export default class UserModel {
    private users: User[];

    constructor() {
        this.users = [];
    }

    findOne(email: string): User | void {
        // TOOD: make DB call
        return this.users.find(u => u.email === email);
    }

    insertOne(partialUser: UserInput): User {
        const { email, password } = partialUser;
        const user = new User(
            getNextId(),
            email,
            password
        );

        // TODO: make DB call
        this.users.push(user);

        return user;
    }
}