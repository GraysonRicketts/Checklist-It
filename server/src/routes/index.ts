import { Router } from 'express';
import graphqlRouter from './graphql';
import { PassportStatic } from 'passport';
import { login, signup } from '../config/auth';
import DB from '../config/database';

export default function appRouter(passport: PassportStatic, db: DB): Router {
    const router = Router();

    router.post('/signup', (req, res, next) => signup(req, res, next, passport));

    router.post('/login', (req, res, next) => login(req, res, next, passport));
    
    router.use('/graphql', passport.authenticate('jwt', { session: false }), graphqlRouter(db));
    
    // Healthcheck
    router.get('/status', (_, res) => {
        res.status(200).end();
    });

    return router;
}
