import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Template {
    id: ID!,
    name: String!,
    tasks: [TemplateTask]!,
    owners: [String]!
}

type TemplateTask {
    id: ID!,
    text: String!,
    parentTask: ID
}

type Checklist {
    id: ID!,
    name: String!
    tasks: [ChecklistTask]
}

type ChecklistTask {
    id: ID!,
    text: String!,
    completed: Boolean!,
    parentTask: ID
}

input TaskInput {
    text: String!,
    parentTask: ID
}

type Query {
    template(id: ID!): Template
    checklist(id: ID!): Checklist
}

type Mutation {
    addTemplate(name: String!): Template
    addTemplateTask(templateId: ID!, text: String!, parentTask: ID): TemplateTask
    addChecklist(name: String!, templateId: ID!): Checklist
}
`);

export default schema;