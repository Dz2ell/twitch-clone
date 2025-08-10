const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { getUserByOAuth, writeUser } = require('../controllers/users');

module.exports = function(passport){
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await getUserByOAuth(id);
    done(null, user || null);
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/oauth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    // find or create
    let user = await getUserByOAuth(profile.id);
    if(!user){
      user = await writeUser({ oauthId: profile.id, username: profile.displayName, provider: 'google' });
    }
    done(null, user);
  }));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/oauth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await getUserByOAuth(profile.id);
    if(!user){
      user = await writeUser({ oauthId: profile.id, username: profile.username || profile.displayName, provider: 'github' });
    }
    done(null, user);
  }));
};
