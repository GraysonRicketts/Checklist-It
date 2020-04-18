import { Template, TemplateTask } from '../../models/Template';
import TemplateRepository from '../../models/Template';

export default class TemplateService {
    private templateModel: TemplateRepository;
    constructor(templateModel: TemplateRepository) {
        this.templateModel = templateModel;
    }

    public get(id: string, user: any): Template | void {
        const template = this.templateModel.findOne(id);

        if (!template || !template.owners.includes(user)) {
            return null;
        }

        return template;
    }
    
    public add(name: string, tasks: TemplateTask[], userId: any): Template {
        return this.templateModel.insertOne({name, tasks}, userId);
    }
}