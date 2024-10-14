import passport, { Profile } from "passport";

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
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
