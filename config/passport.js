import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const GoogleStrategy = passportGoogle.Strategy
passport.use(new GoogleStrategy({
    clientID: "136609867431-i62lo34hc96bj0mo5dvc76459134ob2q.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: process.env.NODE_ENV === "production" 
                  ? `${process.env.SERVER_URL_PROD}/auth/google/callback` 
                  : `${process.env.SERVER_URL_LOCAL}/auth/google/callback`, //"http://localhost:5001/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
      
    let data = {
        full_name: profile._json.name,
        googleId: profile.id,
        email: profile.emails[0].value
    }
      
    const findUser = await User.findOne({email: data.email})
    if(findUser) {
        done(null, {
            id: findUser._id,
            full_name: profile._json.name,
            googleId: profile.id,
            email: profile.emails[0].value,
            token: jwt.sign({id: findUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        });
    } else {
        const usx = await User.create(data);
        done(null, {
            id: usx._id,
            full_name: profile._json.name,
            googleId: profile.id,
            email: profile.emails[0].value,
            token: jwt.sign({id: findUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        })
    }
    //done(null, profile);  
  }
));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });