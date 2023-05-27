const { User } = require("../models/users");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {new: true});

  if (!result) {
    throw HttpError(404, `User with id = ${_id} not found`);
  }

  res.json({
    user: {
      email: result.email,
      subscription: result.subscription
    }
  });
};

module.exports = {
  updateUser: ctrlWrapper(updateUser),
};
