const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("../models/users");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role){
    return res.status(400).send("Please fill in all the required fields!")
  }
  try {
    const userObj = { username, email, role };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    const token = sign({ [role]: user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(201).json({ token, user: { ...user, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }
    if (user.role !== "user"){
      return res.status(404).send("Invalid credentials..");
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch){
       return res.status(400).send("Invalid credentials");
    }
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    if (!user){
      return res.status(400).send("User not found, Authorization denied..");
    }
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getUsers = async (req, res) => {
  try {
    return res.status(200).json(await User.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
}