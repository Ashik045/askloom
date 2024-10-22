import jwt, { Secret } from "jsonwebtoken";
import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/usermodel"; // Import the User model

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        "1077098493332-k62gepmg9c4tg8eb53fqi7adhhbk70fh.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },

    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        let existingUser = await User.findOne({ googleId: profile.id });

        const jwtSecret: Secret =
          process.env.JWT_SECRET_KEY || "your_jwt_secret";

        if (existingUser) {
          const token = jwt.sign(
            { id: existingUser._id, googleId: existingUser.googleId },
            jwtSecret,
            { expiresIn: "2d" }
          );

          return done(null, { user: existingUser, token });
        }

        const newUser: IUser = new User({
          googleId: profile.id,
          displayName: profile.displayName || "Unknown User",
          photoUrl: profile.photos?.[0]?.value || "",
          about: "",
          password: "",
          questions: [],
          comments: [],
          reacts: [],
        });

        await newUser.save();
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

// Serialize the user by saving the user ID in the session
// Use IUser type for serialization
passport.serializeUser((user: IUser, done) => {
  done(null, user._id); // Serialize by user ID
});

// Deserialize user.
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

// passport.serializeUser(
//   (
//     user: Express.User,
//     done: (error: any, user?: Express.User | false | null) => void
//   ) => {
//     done(null, user);
//   }
// );

// // Deserialize the user by finding the user by ID in the database
// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await User.findById(id); // Find the user by ID
//     if (user) {
//       done(null, user); // Pass the user to the session
//     } else {
//       done(null, false); // User not found
//     }
//   } catch (error) {
//     done(error, null); // Handle any errors
//   }
// });
