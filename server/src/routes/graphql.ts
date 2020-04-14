import graphqlHTTP from 'express-graphql';
import { Request } from 'express';

import schema from '../schemas';

import TemplateService from '../services/templates';
import ChecklistService from '../services/checklists';
import TemplateModel from '../models/Template';
import ChecklistModel from '../models/Checklist';
import { User } from '../models/User';

const templateModel = new TemplateModel();
const templateService = new TemplateService(templateModel);
const checklistService = new ChecklistService(new ChecklistModel(), templateModel);

const root = {
    // Queries
    template:  (args: any, context: any) => templateService.get(args.id, context.userId),
    checklist: (args: any, context: any) => checklistService.get(args.id, context.userId),

    // Mutations
    addTemplate: (args: any, context: any) => {
        templateService.add(args.name, args.tasks, context.userId);
    },
    addChecklist: (args: any, context: any) => checklistService.add(args.name, args.templateId, context.userId)
};

export default graphqlHTTP((req: Request) => ({
    schema,
    rootValue: root,
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