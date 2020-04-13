import TemplateService from '../services/templates';
import ChecklistService from '../services/checklists';
import TemplateModel from '../models/Template';
import ChecklistModel from '../models/Checklist';

const templateModel = new TemplateModel();
const templateService = new TemplateService(templateModel);
const checklistService = new ChecklistService(new ChecklistModel(), templateModel);

export const graphQlRoot = {
    // Queries
    template:  (args: any) => templateService.get(args.id),
    checklist: (args: any) => checklistService.get(args.id),

    // Mutations
    addTemplate: (args: any) => { 
        console.log(`args: ${JSON.stringify(args)}`);
        templateService.add(args.name, args.tasks);
    },
    addChecklist: (args: any) => checklistService.add(args.name, args.templateId)
};