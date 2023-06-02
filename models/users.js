const { model } = require("mongoose");

const { userSchema } = require("../schemas/users-schemas");

const User = model("user", userSchema);

module.exports = {
  User,
}
