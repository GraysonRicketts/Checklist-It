import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import appRouter from './routes';
import UserRepository from './models/User';
import { configurePassport as configureAuthentication } from './config/passport';
import DB from './config/database';

const app = express();

// DB
const db = new DB(
    process.env.DB_HOST,
    +process.env.DB_PORT,
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    +process.env.DB_MAX_CONNECTION,
    +process.env.DB_IDLE_TIMEOUT_MILLIS,
    +process.env.DB_CONNECTION_TIMEOUT_MILLIS
);
const userRepo = new UserRepository(db);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Authentication middleware
configureAuthentication(passport, userRepo);

// Router
app.use('/', appRouter(passport));

export default app;