import { Router } from 'express';
import graphqlRouter from './graphql';
import { PassportStatic } from 'passport';
import { login, generateJwt } from '../config/auth';
import { User } from '../models/User';

export default function appRouter(passport: PassportStatic): Router {
    const router = Router();

    router.post('/signup', passport.authenticate('signup', { session: false }), (req, res) => {
        const user = req.user as User;
        const token = generateJwt(user.id, user.email);

        return res.status(201).json({
            token,
            templates: user.templates,
            checklists: user.checklists
        });
    });

    router.post('/login', (req, res, next) => login(req, res, next, passport));
    
    router.use('/graphql', graphqlRouter);
    
    // Healthcheck
    router.get('/status', (_, res) => {
        res.status(200).end();
    });

    return router;
}
