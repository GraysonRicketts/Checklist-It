import TemplateTaskRepository, { TemplateTask } from "../../models/TemplateTask.model";
import TemplateService from "./Template.service";

export default class TemplateTaskService {
    private repo: TemplateTaskRepository;
    private templateService: TemplateService;
    constructor(repo: TemplateTaskRepository, templateService: TemplateService) {
        this.repo = repo;
        this.templateService = templateService;
    }
    
    public async add(templateId: string, text: string, parentTaskId: string, userId: string): Promise<TemplateTask> {
        const template = await this.templateService.get(templateId);
        if (!template) {
            throw Error('Need template to create task');
        }

        if (!template.doesUserHaveAccess(userId)) {
            console.error('User tried to add to template they do not own');
            return null;
        }

        return await this.repo.insertOne(templateId, text, parentTaskId);
    }
}