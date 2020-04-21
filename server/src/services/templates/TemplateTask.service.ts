import TemplateTaskRepository, { TemplateTask } from "../../models/TemplateTask.model";
import TemplateService from "./Template.service";

export default class TemplateTaskService {
    private repo: TemplateTaskRepository;
    private templateService: TemplateService;
    constructor(repo: TemplateTaskRepository, templateService: TemplateService) {
        this.repo = repo;
        this.templateService = templateService;
    }

    public get(id: string): TemplateTask | void {
        // const template = this.templateModel.findOne(id);

        // if (!template || !template.owners.includes(user)) {
        //     return null;
        // }

        // return template;
    }
    
    public async add(templateId: string, text: string, parentTaskId: string, userId: string): Promise<TemplateTask> {
        if (!this.hasAccess(userId, templateId)) {
            throw Error('Invalid template id');
        }

        return await this.repo.insertOne(templateId, text, parentTaskId);
    }

    private async hasAccess(userId: string, templateId: string) {
        const template = await this.templateService.get(templateId, userId);
        return !!template;
    }
}