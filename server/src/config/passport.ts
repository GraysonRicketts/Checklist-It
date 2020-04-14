import { PassportStatic } from 'passport';
import { Strategy as JwtStrategy , ExtractJwt} from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/User';

function createJwtStrategy(userModel: UserModel): JwtStrategy {
  const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
  };

  return new JwtStrategy(opts, (payload, done) => {
      const { email  } = payload;

      const user = userModel.findByEmail(email);
      if (!user) {
          return done(false);
      }

      return done(null, user);
  });
}

export function configurePassport(passport: PassportStatic, userModel: UserModel): void {
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        try {
            const user = userModel.create({ email, password });
            return done(null, user);
        } catch (error) { 
            done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
      }, async (email, password, done) => {
        try {
          const user = userModel.findByEmail(email);
          if( !user ){
            return done(null, false);
          }

          const validate = user.isValidPassword(password);
          if( !validate ){
            return done(null, false);
          }

          //Send the user information to the next middleware
          return done(null, user, { message : 'Logged in Successfully'});
        } catch (error) {
          return done(error);
        }
      }));

    passport.use(createJwtStrategy(userModel));
}

