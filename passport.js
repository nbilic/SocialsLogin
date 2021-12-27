const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const TwitchStrategy = require("passport-twitch").Strategy;

require("dotenv").config();
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //callbackURL: "/auth/google/callback",
      callbackURL:
        "https://twitch-socials-login.herokuapp.com" + "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      profile.method = "GOOGLE";
      done(null, profile);
    }
  )
);

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/discord/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      profile.method = "DISCORD";
      done(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      profile.method = "GITHUB";
      done(null, profile);
    }
  )
);

passport.use(
  new TwitchStrategy(
    {
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/twitch/callback",
      scope: "user_read",
    },
    function (accessToken, refreshToken, profile, done) {
      profile.method = "TWITCH";
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
