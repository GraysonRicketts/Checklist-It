import { Template } from './Template';
import { Checklist } from './Checklist';
import crypto from 'crypto';
import { Pool } from 'pg';
import DB from '../config/database';

export class User {
    public id: string;
    public email: string;
    private hash: string;
    private salt: string;
    public templates: Template[];
    public checklists: Checklist[];

    constructor(id: string, email: string, hash: string, salt: string) {
        this.id = id;
        this.email = email;
        this.hash = hash;
        this.salt = salt;
        
        this.templates = [];
        this.checklists = [];
    }

    isValidPassword(password: string): boolean {
        const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return hashedPassword === this.hash;
    }
}

export type UserInput = {
    email: string;
    password: string;
}

export default class UserRepository {
    private db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    findByEmail(email: string): User | void {
        // TOOD: make DB call
        // return this.users.find(u => u.email === email);
    }

    async create(partialUser: UserInput): Promise<User> {
        const { email, password } = partialUser;

        // Securely store password
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

        const { id } = await this.db.query(`INSERT INTO users (email, hash, salt) VALUES (${email}, ${hashedPassword}, ${salt};`);

        return new User(id, email, hashedPassword, salt);
    }
}