const User = require('../model/User');

module.exports = {
  newUser: async (req, res, next) => {
    try {
      const { user } = req.body;
      const newuser = await User.create(user);
      var token = await newuser.signToken();

      res.json({ user: newuser.userJson(token) });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body.user;
    if (!email || !password) {
      res.status(400).json({ error: 'Email/password required' });
    }
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(400).json({ error: 'Email is not registered' });
      }
      const result = user.verifyPassword(password);
      if (!result) {
        res.status(400).json({ error: 'Invalid password' });
      }
      var token = await user.signToken();
      res.json({ user: user.userJson(token) });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  updateInformation: async (req, res, next) => {
    const { userId } = req.user;
    const { user } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          isAdmin: user.isAdmin,
          email: user.email,
        },
        { new: true }
      );
      const { isAdmin, email } = updatedUser;
      res.json({
        user: {
          isAdmin,
          email,
        },
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
