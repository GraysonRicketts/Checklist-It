import graphqlHTTP from 'express-graphql';

import schema from '../schemas';

import TemplateService from '../services/templates';
import ChecklistService from '../services/checklists';
import TemplateModel from '../models/Template';
import ChecklistModel from '../models/Checklist';

const templateModel = new TemplateModel();
const templateService = new TemplateService(templateModel);
const checklistService = new ChecklistService(new ChecklistModel(), templateModel);

const root = {
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

export default graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    customFormatErrorFn: error => {
        console.error(`GraphQL error: ${JSON.stringify({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
        }, null, process.env.NODE_ENV === 'development' && '\t')}`);

        return error.message;
    }
});