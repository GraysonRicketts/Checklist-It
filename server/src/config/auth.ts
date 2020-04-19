import jwt from 'jsonwebtoken';
import { Request, NextFunction, Response } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../models/User';

export function generateJwt(id: string, email: string) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email,
        id,
        exp: expirationDate.getTime() / 1000,
    }, process.env.JWT_SECRET);
}

export function signup(req: Request, res: Response, next: NextFunction, passport: PassportStatic) {
    passport.authenticate('signup', 
        { failureFlash: 'Unable to create user' }, 
        async (err, user: User) => {
            if (err || !user) {
                const error = new Error('An Error occurred');
                return next(error);
            }

            try {
                // TODO: don't return JWT if error
                const token = generateJwt(user.id, user.email);

                return res.status(201).json({
                    id: user.id,
                    email: user.email,
                    templates: user.templates,
                    checklists: user.checklists,
                    token
                });
            } catch (error) {
                return next(error);
            }
    })(req, res, next);
}

export function login(req: Request, res: Response, next: NextFunction, passport: PassportStatic) {
    passport.authenticate('login', 
        { failureFlash: 'Invalid username or password.' }, 
        async (err, user: User) => {    
            if (err || !user) {
                const error = new Error('An Error occurred');
                return next(error);
            }

            try {
                await req.login(user, { session : false }, (error) => {
                    if( error ) {
                        throw error
                    }

                    const { id, email, checklists,
                        templates } = user;
                    
                    const token = generateJwt(id, email)
                    
                    // Send back the token to the user
                    return res.status(200).json({ 
                        id,
                        email,
                        token,
                        templates,
                        checklists
                    });
                });     
            } catch (error) {
                return next(error);
            }
    })(req, res, next);
}