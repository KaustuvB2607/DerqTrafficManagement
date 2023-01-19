const passport = require("passport"); // authentication
const Admin = require("../DAO/adminSchema");
const LocalStrategy = require("passport-local").Strategy;

// Passport Local Strategy
passport.use(Admin.createStrategy());

passport.use(
  new LocalStrategy(function (username, password, done) {
    Admin.findOne({ username: username }, function (error, result) {
      if (error) {
        return done(error);
      }
      if (!result) {
        return done(null, false, { message: "Admin not found." });
      }
      if (result.password !== password) {
        return done(null, false, {
          message: "Invalid password.",
        });
      }
      return done(null, result, {
          message: result.username + " logged in"
      });
    });
  })
);

// To use with sessions
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

module.exports = passport;
