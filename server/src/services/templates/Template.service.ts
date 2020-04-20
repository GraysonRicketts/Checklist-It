import { Template } from '../../models/Template';
import TemplateRepository from '../../models/Template';

export default class TemplateService {
    private templateModel: TemplateRepository;
    constructor(templateModel: TemplateRepository) {
        this.templateModel = templateModel;
    }

    public async get(id: string, userId: string): Promise<Template | void> {
        const template =  await this.templateModel.findOne(id);
        
        if (!template || !template.owners.includes(userId)) {
            return null;
        }

        console.log(`template: ${JSON.stringify(template)}`)
        return template;
    }
    
    public async add(name: string, userId: any): Promise<Template> {
        return await this.templateModel.insertOne({name}, userId);
    }
}