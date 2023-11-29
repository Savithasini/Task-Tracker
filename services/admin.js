const {compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("../models/admin");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username }).lean();
    if (!admin) return res.status(404).send("Invalid credentials");
    if (admin.role !== "admin")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ admin }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req?.admin?._id).select("-password").lean();
    if (!admin)
      return res.status(400).send("Admin not found, Authorization denied..");
    return res.status(200).json({ ...admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
