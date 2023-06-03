const { User } = require("../models/users");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, `User with id = ${_id} not found`);
  }

  res.json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const avatarsDir = path.resolve("public", "avatars");
  
const updateAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarsDir, filename);
  
  await fs.rename(tempUpload, resultUpload);

  Jimp.read(resultUpload, (err, resfile) => {
    if (err) throw err;
    resfile
      .resize(250, 250) // resize
      .write(resultUpload); // save
  });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  updateUser: ctrlWrapper(updateUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
