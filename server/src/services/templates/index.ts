import { Template, TemplateTask } from '../../models/Template';
import TemplateModel from '../../models/Template';

export default class TemplateService {
    private templateModel: TemplateModel;
    constructor(templateModel: TemplateModel) {
        this.templateModel = templateModel;
    }

    public get(id: string): Template | void {
        return this.templateModel.findOne(id);
    }
    
    public add(name: string, tasks: TemplateTask[]): Template {
        return this.templateModel.insertOne({name, tasks});
    }
}