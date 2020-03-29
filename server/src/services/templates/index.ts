import { Template } from '../../models/Template';
import TemplateModel from '../../models/Template';

export default class TemplateService {
    private templateModel: TemplateModel;
    constructor(templateModel: TemplateModel) {
        this.templateModel = templateModel;
    }

    public get(args: any): Template | void {
        const { id } = args;
        return this.templateModel.findOne(id);
    }
    
    public add(args: any): Template {
        const { name, tasks } = args;
        return this.templateModel.insertOne({name, tasks});
    }
}