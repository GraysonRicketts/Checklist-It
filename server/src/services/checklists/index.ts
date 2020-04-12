import ChecklistModel, { Checklist, ChecklistTask } from '../../models/Checklist';
import TemplateModel from '../../models/Template';

export default class ChecklistService {
    private templateModel: TemplateModel;
    private checklistModel: ChecklistModel;
    constructor(checklistModel: ChecklistModel, templateModel: TemplateModel) {
        this.templateModel = templateModel;
        this.checklistModel = checklistModel;
    }

    public get(id: string): Checklist | void {
        return this.checklistModel.findOne(id);
    }
    
    public add(name: string, templateId: string): Checklist {
        // Create checklist from template
        const template = this.templateModel.findOne(templateId);
        if (!template) {
            console.error(`Could not find template id ${templateId} in order to create checklist`);
            throw new Error('Unable to create checklist');
        }

        const tasks = template.tasks.map(t => ({
            ...t,
            completed: false
        } as ChecklistTask));

        return this.checklistModel.insertOne({name, tasks});
    }
}