import express from 'express';
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
app.use(passport.initialize());

// Authentication middleware
configureAuthentication(passport, userModel);

// Router
app.use('/', appRouter(passport));

export default app;