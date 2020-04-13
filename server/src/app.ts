import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import appRouter from './routes';
import UserModel from './models/User';
import { configurePassport as configureAuthentication } from './config/passport';

const app = express();

// DB
const userModel = new UserModel();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication middleware
configureAuthentication(passport, userModel);

// Router
app.use('/', appRouter(passport));

export default app;