const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        // Username/email does not exist
        if (!user) {
          return done(null, false, {
            message: "Email/Username is not registered!",
          });
        }
        // Email exist and now we need to verify the password
        const isMatch = await user.isValidPassword(password);
        // if (isMatch) {
        //   return done(null, user);
        // } else {
        //   return done(null, false, {
        //     message: "Invalid Email or Password!",
        //   });
        // }
        return isMatch
          ? done(null, user)
          : done(null, false, {
              message: "Invalid Email or Password!",
            });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const foundUser = await User.findById(id);
    // console.log("requested from deserialize", foundUser);
    done(null, foundUser);
  } catch (error) {
    done(error);
  }
});

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
