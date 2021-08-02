var jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      const payload = await jwt.verify(token, process.env.SECRET);
      console.log(payload);
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({
        message: 'user authentication failed',
      });
    }
  },
};
