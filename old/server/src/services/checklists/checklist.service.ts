import ChecklistRepository, { Checklist, ChecklistTask } from '../../models/Checklist.model';
import TemplateRepository from '../../models/Template.model';

export default class ChecklistService {
    private templateModel: TemplateRepository;
    private checklistModel: ChecklistRepository;
    constructor(checklistModel: ChecklistRepository, templateModel: TemplateRepository) {
        this.templateModel = templateModel;
        this.checklistModel = checklistModel;
    }

    public async get(id: string): Promise<Checklist | void> {
        return await this.checklistModel.findOne(id);
    }
    
    public async add(name: string, templateId: string, userId: string): Promise<Checklist> {
        // Create checklist from template
        const template = await this.templateModel.findOne(templateId);
        if (!template) {
            throw new Error('Need template to create checklist');
        }

        if (!template.doesUserHaveAccess(userId)) {
            console.error('User tried to access template they do not have access to')
            return null;
        }

        return this.checklistModel.insertOne(name, template.tasks, userId);
    }
}