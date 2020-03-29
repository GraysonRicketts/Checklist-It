import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schemas';
import { graphQlRoot } from './api';

const app = express();

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: graphQlRoot,
    graphiql: true,
}));

// Routes
app.get('/healthcheck', (_, res) => {
    res.status(200).send('Server is running');
});



export default app;