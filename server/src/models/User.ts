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

    constructor(id: string, email: string, hash: string, salt: string, templates: Template[] = [], checklists: Checklist[] = []) {
        this.id = id;
        this.email = email;
        this.hash = hash;
        this.salt = salt;
        this.templates = templates;
        this.checklists = checklists;
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

    async findByEmail(email: string): Promise<User | void> {
        // TODO: pull in checklists and templates at the same time
        const res = await this.db.query({
            query: `
            SELECT id, hash, salt 
            FROM users
            WHERE email=$1;`,
            values: [email]
        });
        
        if (!res.rows.length) {
            return null;
        }

        const {id, hash, salt} = res.rows[0];

        return new User(id, email, hash, salt);
    }

    async insert(partialUser: UserInput): Promise<User> {
        const { email, password } = partialUser;

        // Securely store password
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

        const res = await this.db.query({
            query: `INSERT INTO users (email, hash, salt) VALUES ($1, $2, $3) RETURNING id;`, 
            values: [email, hashedPassword, salt]
        });
        const { id } = res.rows[0];

        return new User(id, email, hashedPassword, salt);
    }
}