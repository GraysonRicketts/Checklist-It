import DB, { QueryRequest } from "../config/database";
import { QueryResult } from "pg";

import { TemplateTask } from '../models/TemplateTask';

export type Template = {
    id: string;
    name: string;
    tasks: TemplateTask[];
    owners: string[];
}

type TemplateInput = {
    name: string;
}

export default class TemplateRepository {
    private db: DB;
    constructor(db: DB) {
        this.db = db;
    }

    public async findOne(id: string): Promise<Template | void> {
        const res = await this.db.transaction([
            {
                query: 'SELECT id, name FROM templates WHERE id=$1',
                values: [id]
            },
            {
                query: 'SELECT id, text, parent_task as parentTask FROM template_task WHERE template_id=$1',
                values: [id]
            },
            {
                query: 'SELECT user_id FROM user_template WHERE template_id=$1',
                values: [id]
            }
        ]);

        if (!res[0].rows.length) {
            throw Error('Template not found');
        }

        return {
            id,
            name: res[0].rows[0].name,
            tasks: res[1].rows.map(row => ({
                id: row.id,
                text: row.text,
                parentTask: row.parentTask
            })),
            owners: res[2].rows.map(row => row.user_id)
        } as Template;
    }

    public async insertOne(partialTemplate: TemplateInput, ownerId: string): Promise<Template> {
        const { name } = partialTemplate;

        const requests: QueryRequest[] = [
            {
                query: 'INSERT INTO templates (name) VALUES ($1) RETURNING id',
                values: [name],
                callback: (res: QueryResult) => {
                    const templateId = res.rows[0].id;

                    return [
                        {
                            query: 'INSERT INTO user_template (user_id, template_id) VALUES ($1, $2)',
                            values: [ownerId, templateId]
                        } as QueryRequest
                    ];
                }
            } as QueryRequest,
        ];

        const res = await this.db.transaction(requests);
        const { id } = res[0].rows[0];
        const template: Template = {
            id,
            tasks: [],
            owners: [ownerId],
            name
        };

        return template;
    }
}