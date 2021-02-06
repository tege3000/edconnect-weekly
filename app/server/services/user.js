const { translateError } = require("../models/helper");
const User = require("../models/user");
const users = require("../models/users").Users;

/* Creates new user */
const create = async ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
  try {
    const user = new User({
      firstname,
      lastname,
      email,
      matricNumber,
      program,
      graduationYear
    });

    user.setPassword(password)
    if (user) {
      await user.save()
      return [true, user];
    } else {
      return [false, users.errors];
    }
  }
  catch(e) {
    console.log(translateError(e))
  }
};

/* Authenticate a user */
const authenticate = async (email, password) => {
  const user = await User.findOne({email})

  if (await user.validPassword(password)) {
    return [true, user];
  } else {
    return [false, ["Invalid email/password"]];
  }
};

/* Return user with specified id */
const getById = (id) => {
  return User.findById(id);
};

/* Return all users */
const getAll = () => {
  return User.find();
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};