const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    ALL_USER: 'all_user',
};

function auth(role) {
    return (req, res, next) => {
      const token = req.header('Authorization');
  
      if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = decoded.user;
        
        // Check if user role matches the required role
        if (user.role !== role && role !== "all_user") {
          return res.status(401).json({ msg: 'Unauthorized' });
        }
  
        next();
      } catch (err) {
        res.status(401).json({ msg: 'Token is not valid!' });
      }
    };
  }

module.exports = auth;