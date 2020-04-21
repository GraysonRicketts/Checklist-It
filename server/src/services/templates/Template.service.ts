import { Template } from '../../models/Template.model';
import TemplateRepository from '../../models/Template.model';

export default class TemplateService {
    private templateModel: TemplateRepository;
    constructor(templateModel: TemplateRepository) {
        this.templateModel = templateModel;
    }

    public async get(id: string): Promise<Template | void> {
        const template =  await this.templateModel.findOne(id);

        return template;
    }
    
    public async add(name: string, userId: any): Promise<Template> {
        return await this.templateModel.insertOne({name}, userId);
    }
}