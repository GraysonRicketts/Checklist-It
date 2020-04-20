import DB from "../config/database"

export type TemplateTask = {
    id: string;
    text: string;
    parentTask?: string;
}

export default class TemplateTaskRepository {
    private db: DB;
    constructor(db: DB) {
        this.db = db;
    }

    public async insertOne(templateId: string, text: string, parentTaskId?: string): Promise<TemplateTask> {
        const res = await this.db.query({
            query: 'INSERT INTO template_task (template_id, text, parent_task) VALUES ($1, $2, $3) RETURNING id',
            values: [templateId, text, parentTaskId]
        });

        const { id } = res.rows[0];
        return {
            id,
            text,
            parentTask: parentTaskId
        } as TemplateTask;
    }
}