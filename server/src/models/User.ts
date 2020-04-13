import { Template } from './Template';
import { Checklist } from './Checklist';
import crypto from 'crypto';

const nextId = 1;
function getNextId(): string {
    return (this.nextId++).toString();
}

export class User {
    public id: string;
    public email: string;
    private hash: string;
    private salt: string;
    public templates: Template[];
    public checklists: Checklist[];

    constructor(id: string, email: string, hash: string, salt: string) {
        this.email = email;
        this.hash = hash;
        this.salt = salt;
        
        this.id = getNextId();
        this.templates = [];
        this.checklists = [];
    }

    verifyPassword(password: string) {
        const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return hashedPassword === this.hash;
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

        // Securely store password
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

        const user = new User(
            getNextId(),
            email,
            hashedPassword,
            salt
        );

        // TODO: make DB call
        this.users.push(user);

        return user;
    }
}