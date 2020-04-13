import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import schema from './schemas';
import { graphQlRoot } from './api';
import UserModel, { User } from './models/User';

const ENV = process.env.NODE_ENV;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }));

// Authentication
app.use(passport.initialize());
app.use(passport.session());

const userModel = new UserModel();
passport.use(new LocalStrategy(
    (email, password, done) => {
        let user: User | void;
        try{
            user = userModel.findOne(email);
        } catch (err) {
            done(err);
        }

        if (!user) { 
            return done(null, false); 
        }
        if (!user.verifyPassword(password)) { 
            return done(null, false); 
        }
        return done(null, user);
    }
  ));

// Auth routes
app.post('/login', 
    passport.authenticate('local', 
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: 'Invalid username or password.'
        }
    )
);
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// GraphQL Routes
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

// HTTP Routes
app.get('/status', (_, res) => {
    res.status(200).end();
});



export default app;