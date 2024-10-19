import passport, { Profile } from "passport";

// import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Correct import

// var GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/usermodel"; // Import the User model

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

    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        // Check if the user already exists in the database
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // If the user exists, return the user
          return done(null, existingUser);
        }

        // If the user doesn't exist, create a new one
        const newUser: IUser = new User({
          googleId: profile.id,
          displayName:
            profile.displayName || profile.username || "Unknown User",
          photoUrl: profile.photos?.[0]?.value || "",
        });

        await newUser.save(); // Save the user to the database
        return done(null, newUser);
      } catch (error) {
        return done(error, undefined);
      }
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
