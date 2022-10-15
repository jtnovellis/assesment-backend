const { signIn, signUp } = require('./user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUpHandle = async (req, res) => {
  const userData = req.body;
  try {
    const encPassword = await bcrypt.hash(userData.password, 10);
    const user = await signUp(userData, encPassword);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res
      .status(201)
      .json({ message: 'User created successfully', data: token });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not be created', error: err });
  }
};

const signInHandle = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signIn(email);
    if (!user) {
      throw new Error('Some of your credentials are invalid, email');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Some of your credentials are invalid, passw');
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res.status(201).json({ message: 'Login successfully', data: token });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not login', error: err.message });
  }
};

module.exports = { signInHandle, signUpHandle };
