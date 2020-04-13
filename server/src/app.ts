import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import appRouter from './routes';
import UserModel from './models/User';

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET }));

// Authentication
app.use(passport.initialize());
app.use(passport.session());

// Router
const userModel = new UserModel();
app.use('/', appRouter(userModel));

// const userModel = new UserModel();
// passport.use(new JwtStrategy(
//     (email, password, done) => {
//         let user: User | void;
//         try{
//             user = userModel.findOne(email);
//         } catch (err) {
//             done(err);
//         }

//         if (!user) { 
//             return done(null, false); 
//         }
//         if (!user.verifyPassword(password)) { 
//             return done(null, false); 
//         }
//         return done(null, user);
//     }
//   ));

// Auth routes
// app.post('/login', 
//     passport.authenticate('local', 
//         {
//             successRedirect: '/',
//             failureRedirect: '/login',
//             failureFlash: 'Invalid username or password.'
//         }
//     )
// );
// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });



export default app;