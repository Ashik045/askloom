import passport, { Profile } from "passport";

// import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Correct import

// var GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1077098493332-k62gepmg9c4tg8eb53fqi7adhhbk70fh.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    //   function(accessToken, refreshToken, profile, cb) {
    //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });
    //   }

    // const user = {
    //     googleId: profile.id,
    //     username: profile.username,
    //     avater = profile.photos[0]
    // }

    // user.save()

    function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: Express.User) => void
    ) {
      done(null, profile);
    }
  )
);

passport.serializeUser(
  (user: Express.User, done: (error: any, id?: any) => void) => {
    done(null, user);
  }
);

passport.deserializeUser(
  (
    user: Express.User,
    done: (error: any, user?: Express.User | false | null) => void
  ) => {
    done(null, user);
  }
);
