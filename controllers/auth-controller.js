const User = require('../models/user-model');

// User SignUp functionality
const signup = async (req, res) => {
  try {
    // Getting user data
    const { username, email, phone, password } = req.body;

    // Checking email-> Is the email is in the database?
    const userExists = await User.findOne({ email });

    // Checking User existence in the database
    if (userExists) {
      return res.status(400).json({ message: 'Email Already exists' });
    }

    // creating a user
    const userCreated = await User.create({ username, email, phone, password });

    // Response-> we will get from server
    return res.status(200).json({
      User: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    return res.status(500).json('internal server error');
  }
};

// Login Functionality
const login = async (req, res) => {
  try {
    // Getting the User Data
    const { email, password } = req.body;

    // Checking User existence in the database
    const userExist = await User.findOne({ email });

    // If user not found in the database, we will return the response as follow
    if (!userExist) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // compare password
    const user = await userExist.comparePassword(password);

    // If user is in the database then we return the response
    if (user) {
      res.status(200).json({
        msg: 'Login Successful',
        token: await userExist.generateToken(),
        // token: token,
        userId: userExist._id.toString(),
      });
    }
  } catch (error) {
    res.status(500).json('internal server error');
  }
};

const profile = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error from the user Route: ${error}`);
  }
};

const updateProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('id:', id);
    const updateUserData = req.body;
    console.log('updateUserData:', updateUserData);
    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updateUserData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

const deleteProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  profile,
  updateProfileById,
  deleteProfileById,
};
