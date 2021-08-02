const { findById } = require('../model/UserRole');
const UserRole = require('../model/UserRole');
const User = require('../model/User');
module.exports = {
  newUser: async (req, res, next) => {
    try {
      const { user } = req.body;
      const { userId } = req.user;
      const findUser = await User.findById(userId);
      if (findUser.isAdmin) {
        const createUser = await UserRole.create(user);
        res.json(createUser);
      } else {
        throw new Error('you are not admin');
      }
    } catch (err) {
      console.log(err);
      res.send({ message: err.message });
    }
  },
};
