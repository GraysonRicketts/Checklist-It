import ChecklistRepository, { Checklist, ChecklistTask } from '../../models/Checklist.model';
import TemplateRepository from '../../models/Template.model';

export default class ChecklistService {
    private templateModel: TemplateRepository;
    private checklistModel: ChecklistRepository;
    constructor(checklistModel: ChecklistRepository, templateModel: TemplateRepository) {
        this.templateModel = templateModel;
        this.checklistModel = checklistModel;
    }

    public get(id: string, userId: string): Checklist | void {
        const checklist = this.checklistModel.findOne(id);

        return checklist;
    }
    
    public async add(name: string, templateId: string, userId: string): Promise<Checklist> {
        // Create checklist from template
        const template = await this.templateModel.findOne(templateId);
        if (!template) {
            console.error(`Could not find template id ${templateId} in order to create checklist`);
            throw new Error('Unable to create checklist');
        }

        const tasks = template.tasks.map(t => ({
            ...t,
            completed: false
        } as ChecklistTask));

        return this.checklistModel.insertOne({name, tasks}, userId);
    }
}