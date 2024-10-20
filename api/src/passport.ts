import passport, { Profile } from "passport";

// import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Correct import

// var GoogleStrategy = require("passport-google-oauth20").Strategy;
import jwt, { Secret } from "jsonwebtoken";
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
        const jwtSecret: Secret =
          process.env.JWT_SECRET_KEY || "@zP3m6M8*Wx%2F";

        if (existingUser) {
          // Generate JWT token
          const token = jwt.sign(
            { id: existingUser._id, googleId: existingUser.googleId },
            jwtSecret, // Use environment variable for secret
            { expiresIn: "2d" }
          );

          return done(null, { user: existingUser, token });
        }

        // If the user doesn't exist, create a new one
        const newUser: IUser = new User({
          googleId: profile.id,
          displayName:
            profile.displayName || profile.username || "Unknown User",
          photoUrl: profile.photos?.[0]?.value || "",
        });

        await newUser.save(); // Save the user to the database
        // Generate JWT token
        const token = jwt.sign(
          { id: newUser._id, googleId: newUser.googleId },
          jwtSecret,
          { expiresIn: "2d" }
        );

        return done(null, { user: newUser, token });
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.deserializeUser(
  (
    user: Express.User,
    done: (error: any, user?: Express.User | false | null) => void
  ) => {
    done(null, user);
  }
);

// Deserialize the user by finding the user by ID in the database
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id); // Find the user by ID
    if (user) {
      done(null, user); // Pass the user to the session
    } else {
      done(null, false); // User not found
    }
  } catch (error) {
    done(error, null); // Handle any errors
  }
});
