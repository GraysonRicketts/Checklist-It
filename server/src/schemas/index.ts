import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Template{
    id: ID!,
    name: String!,
    tasks: [TemplateTask]!
}

type TemplateTask{
    id: ID,
    text: String!,
    parentTask: ID
}

input TemplateTaskInput {
    text: String!,
    parentTask: ID
}

type Query {
    template(id: ID!): Template
}

type Mutation {
    addTemplate(name: String!, tasks: [TemplateTaskInput]!): Template
}
`);

export default schema;