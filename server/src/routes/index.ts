import { Router } from 'express';
import graphqlRouter from './graphql';
import UserModel from '../models/User';

import apiRouter from './api';

export default function appRouter(userModel: UserModel): Router {
    const router = Router();

    router.use('/api', apiRouter(userModel));
    
    router.use('/graphql', graphqlRouter);
    
    // Healthcheck
    router.use('/status', (_, res) => {
        res.status(200).end();
    });

    return router
}
