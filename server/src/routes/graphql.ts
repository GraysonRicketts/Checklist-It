import graphqlHTTP from 'express-graphql';
import { Request } from 'express';

import schema from '../schemas';

import TemplateService from '../services/templates/Template.service';
import ChecklistService from '../services/checklists/checklist.service';
import TemplateRepository from '../models/Template.model';
import ChecklistRepository from '../models/Checklist.model';
import { User } from '../models/User.model';
import DB from '../config/database';
import TemplateTaskService from '../services/templates/TemplateTask.service';
import TemplateTaskRepository from '../models/TemplateTask.model';



const root = (db: DB) => {
    const templateRepo = new TemplateRepository(db);
    const templateTaskRepo = new TemplateTaskRepository(db);

    const templateService = new TemplateService(templateRepo);
    const templateTaskService = new TemplateTaskService(templateTaskRepo, templateService);
    const checklistService = new ChecklistService(new ChecklistRepository(), templateRepo);
    
    return {
        // Queries
        template:  async (args: any, context: any) => await templateService.get(args.id, context.userId),
        checklist: (args: any, context: any) => checklistService.get(args.id, context.userId),

        // Mutations
        addTemplate: async (args: any, context: any) => await templateService.add(args.name, context.userId),
        addTemplateTask: async(args: any, context: any) => await templateTaskService.add(args.templateId, args.text, args.parentTaskId, context.userId),
        addChecklist: (args: any, context: any) => checklistService.add(args.name, args.templateId, context.userId)
    }
};

export default (db: DB) => graphqlHTTP((req: Request) => ({
    schema,
    rootValue: root(db),
    graphiql: true,
    context: { userId: (req.user as User).id },
    customFormatErrorFn: error => {
        console.error(`GraphQL error: ${JSON.stringify({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
        }, null, process.env.NODE_ENV === 'development' && '\t')}`);

        return error.message;
    }
}));