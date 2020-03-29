import express, { NextFunction, Request } from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schemas';
import { graphQlRoot } from './api';

const ENV = process.env.NODE_ENV;

const app = express();

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: graphQlRoot,
    graphiql: true,
    customFormatErrorFn: error => {
        console.error(`GraphQL error: ${JSON.stringify({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
        }, null, ENV === 'development' && '\t')}`);

        return error.message;
    }
}));

// Routes
app.get('/healthcheck', (_, res) => {
    res.status(200).send('Server is running');
});



export default app;