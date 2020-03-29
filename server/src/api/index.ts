import { Template } from '../models/Template';

const templates: Template[] = [];
function getTemplate(args: any): Template | void {
    const { id } = args;
    console.log('get template')
    return templates.find(t => t.id === id);
}

let id = 1;
function getNextId() {
    return (id++).toString();
}

function addTemplate(args: any): Template {
    const { name, tasks } = args;
    console.log('adding template');

    const template: Template = {
        id: getNextId(),
        name,
        tasks: tasks.map((t: any) => ({ ...t, id: getNextId()}))
    };
    templates.push(template);

    return template;
}

export const graphQlRoot = {
    // Queries
    template: getTemplate,

    // Mutations
    addTemplate: addTemplate
};