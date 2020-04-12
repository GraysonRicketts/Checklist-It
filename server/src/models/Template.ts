export type Template = {
    id: string;
    name: string;
    tasks: TemplateTask[];
}

export type TemplateTask = {
    id: string;
    text: string;
    parentTask?: string;
}

type TemplateInput = {
    name: string;
    tasks: TemplateTaskInput[];
}

type TemplateTaskInput = {
    text: string;
    parentTask?: string;
}

export default class TemplateModel {
    private nextId: number;
    private templates: Template[];
    constructor() {
        this.templates = [];
        this.nextId = 1;
    }

    findOne(id: string): Template | void {
        // TODO: make DB call
        return this.templates.find(t => t.id === id);
    }

    getNextId(): string {
        return (this.nextId++).toString();
    }

    insertOne(partialTemplate: TemplateInput): Template {
        const { name, tasks } = partialTemplate;
        const template: Template = {
            id: this.getNextId(),
            tasks: tasks.map(t => ({...t, id: this.getNextId()} as TemplateTask)),
            name
        };

        // TODO: make DB call
        this.templates.push(template);

        return template;
    }
}