import { Router } from 'express';
import graphqlRouter from './graphql';
import { PassportStatic } from 'passport';
import { login, generateJwt, signup } from '../config/auth';
import { User } from '../models/User';

export default function appRouter(passport: PassportStatic): Router {
    const router = Router();

    router.post('/signup', (req, res, next) => signup(req, res, next, passport));

    router.post('/login', (req, res, next) => login(req, res, next, passport));
    
    router.use('/graphql', passport.authenticate('jwt', { session: false }), graphqlRouter);
    
    // Healthcheck
    router.get('/status', (_, res) => {
        res.status(200).end();
    });

    return router;
}
