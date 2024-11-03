import jwt, { Secret } from "jsonwebtoken";
import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/usermodel"; // Import the User model

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        "1077098493332-137np8olfj3l8hbqeafunkgjj34f3bfa.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
      callbackURL: "https://askloom-api.onrender.com/api/auth/google/callback",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    },

    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        // Extract email from Google profile
        // const email = profile.emails && profile.emails[0]?.value;

        // console.log(profile);
        // console.log(email);

        // Check if the user already exists
        let user = await User.findOne({ googleId: profile.id });

        const jwtSecret: Secret =
          process.env.JWT_SECRET_KEY || "@@&8a@zP3m6M8*Wx%";

        if (user) {
          // Generate a JWT token
          const token = jwt.sign(
            { id: user._id, googleId: user.googleId },
            jwtSecret,
            { expiresIn: "2d" }
          );

          // Return existing user and token
          return done(null, { user, token } as unknown as Express.User); // Return user and token
        }

        // If user does not exist, create a new one
        const newUser: IUser = new User({
          googleId: profile.id,
          email: "", // Save email if available
          displayName: profile.displayName || "Unknown User",
          photoUrl: profile.photos?.[0]?.value || "",
          title: "New User",
          about:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla nam eligendi quia repellendus, eum amet harum? Sequi, fugit sed reiciendis, ex nesciunt excepturi reprehenderit eum, porro corporis cumque accusamus in!",
          password: "",
          questions: [],
          comments: [],
          reacts: [],
        });

        await newUser.save();

        // Generate a JWT token for the new user
        const token = jwt.sign(
          { id: newUser._id, googleId: newUser.googleId },
          jwtSecret,
          { expiresIn: "2d" }
        );

        // Return new user and token
        return done(null, { user: newUser, token } as unknown as Express.User); // Return new user and token
      } catch (error) {
        return done(error, undefined); // Handle error
      }
    }
  )
);

// Serialize the user by saving the user ID in the session
passport.serializeUser((user, done) => {
  const userObj = user as unknown as { user: IUser; token: string }; // user contains both user and token
  done(null, userObj.user._id); // Serialize only the user ID
});

// Deserialize user.
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user); // Pass the user object to the session
    } else {
      done(new Error("User not found"), null); // Handle user not found
    }
  } catch (error) {
    done(error, null); // Handle any errors during deserialization
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
