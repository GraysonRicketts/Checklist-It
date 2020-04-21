import DB from "../config/database"
import { TemplateTask } from "./TemplateTask.model";

export class Checklist {
    constructor(
        public id: string, 
        public name: string, 
        public tasks: ChecklistTask[], 
        public ownerId: string) { }

        public doesUserHaveAccess(userId: string) {
            return this.ownerId === userId;
        }
}

export type ChecklistTask = {
    id: string;
    text: string;
    parentTask?: string;
}

export default class ChecklistRepository {
    private db: DB;
    constructor(db: DB) {
        this.db = db;
    }

    async findOne(id: string): Promise<Checklist | void> {
        const res = await this.db.transaction([
            {
                query: 'SELECT id, name, owner_id as ownerId FROM checklists WHERE id=$1',
                values: [id]
            },
            {
                query: 'SELECT id, text, parent_task as parentTask, completed FROM checklist_task WHERE checklist_id=$1',
                values: [id]
            },
        ]);

        if (!res[0].rows.length) {
            throw Error('Checklist not found');
        }

        return new Checklist(
            id,
            res[0].rows[0].name,
            res[1].rows.map(row => ({
                id: row.id,
                text: row.text,
                parentTask: row.parentTask,
                completed: row.completed
            })),
            res[0].rows[0].userId
        );
    }

    async insertOne(name: string, tasks: TemplateTask[] , ownerId: string): Promise<Checklist> {
        const res = await this.db.transaction([
            {
                query: 'INSERT INTO checklists (name, owner_id) VALUES ($1, $2) RETURNING id',
                values: [name, ownerId],
                callback: (res) => tasks.map(t => ({
                    query: 'INSERT INTO checklist_task (text, parent_task, completed, checklist_id) VALUES ($1, $2, $3, $4) RETURNING id, text, parent_task',
                    values: [t.text, t.parentTask, false, res.rows[0].id]
                }))
            }
        ])

        return new Checklist(
            res[0].rows[0].id,
            name,
            !res[1].rows.length ? [] :
                res[1].rows.map(r => ({
                    id: r.id,
                    text: r.text,
                    parentTask: r.parent_task,
                    completed: false
                })),
            ownerId
        );
    }
}