const bcrypt = require('bcrypt');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/user.model');
const { JWT_SECRET } = require('../config/config');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

// Add your password validation function here
const isValidPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error validating password:', error);
    return false;
  }
};

const configurePassport = () => {
  // Local Strategy
  passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async function(email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }

        // Call the isValidPassword function here
        const isValidPasswordResult = await isValidPassword(password, user.password);

        if (!isValidPasswordResult) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // JWT Strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      cookieExtractor,
    ]),
    secretOrKey: JWT_SECRET,
  };
  
  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }))
}

module.exports = configurePassport;
