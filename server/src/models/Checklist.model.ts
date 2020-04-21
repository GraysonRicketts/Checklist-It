export type Checklist = {
    id: string;
    name: string;
    tasks: ChecklistTask[];
}

export type ChecklistTask = {
    id: string;
    text: string;
    completed: boolean;
    parentTask?: string;
}

type ChecklistInput = {
    name: string;
    tasks: ChecklistTaskInput[];
}

type ChecklistTaskInput = {
    text: string;
    parentTask?: string;
}

export default class ChecklistRepository {
    private nextId: number;
    private checklists: Checklist[];
    constructor() {
        this.checklists = [];
        this.nextId = 1;
    }

    findOne(id: string): Checklist | void {
        // TODO: make DB call
        return this.checklists.find(c => c.id === id);
    }

    getNextId(): string {
        return (this.nextId++).toString();
    }

    insertOne(partialChecklist: ChecklistInput, ownerId: string): Checklist {
        const { name, tasks } = partialChecklist;
        const checklist: Checklist = {
            id: this.getNextId(),
            tasks: tasks.map(t => ({...t, id: this.getNextId()} as ChecklistTask)),
            name
        };

        // TODO: make DB call
        this.checklists.push(checklist);

        return checklist;
    }
}