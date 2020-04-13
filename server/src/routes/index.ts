import { Router } from 'express';
import graphqlRouter from './graphql';
import { PassportStatic } from 'passport';
import jwt from 'jsonwebtoken';

export default function appRouter(passport: PassportStatic): Router {
    const router = Router();

    router.post('/signup', passport.authenticate('signup'), (req, res) => {
        return res.status(201).json({
            message: 'Signup successful',
            user: req.user
        });
    });

    router.post('/login', (req, res, next) => {
        passport.authenticate('login', async (err, user) => {    
            if (err || !user) {
                const error = new Error('An Error occurred');
                return next(error);
            }

            try {
                await req.login(user, { session : false }, (error) => {
                    if( error ) {
                        return next(error);
                    }
                    
                    // We don't want to store the sensitive information such as the
                    // user password in the token so we pick only the email and id
                    const body = { 
                        id : user.id, 
                        email : user.email
                    };
                    
                    // Sign the JWT token and populate the payload with the user email and id
                    const token = jwt.sign({ user : body }, process.env.JWT_SECRET);
                    
                    // Send back the token to the user
                    return res.status(200).json({ token });
                });     
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    })
    
    router.use('/graphql', graphqlRouter);
    
    // Healthcheck
    router.get('/status', (_, res) => {
        res.status(200).end();
    });

    return router
}
