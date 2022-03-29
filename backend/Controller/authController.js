const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/keys");

module.exports.register_controller = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(404).json({ error: "Please provide all info" });
    }
    const checkUser = await UserModel.findOne({ email: email });
    if (checkUser) {
      return res.status(404).json({ error: "Email already exists" });
    }

    var hashPass = bcrypt.hashSync(password, 12);

    const newUser = new UserModel({ userName, email, password: hashPass });

    newUser
      .save()
      .then((result) => {
        var token = jwt.sign({ _id: result._id }, SECRET_KEY);

        return res
          .status(201)
          .json({ success: "New user added successfully", token });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ error: "Something went wrong" });
      });
  } catch (error) {
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.login_controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ error: "Please provide all info" });
    }
    const checkUser = await UserModel.findOne({ email: email });
    if (!checkUser) {
      return res.status(404).json({ error: "Email doesn't exists" });
    }

    var checkPass = bcrypt.compareSync(password, checkUser.password);
    if (!checkPass) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    var token = jwt.sign({ _id: checkUser._id }, SECRET_KEY);

    return res.status(201).json({ success: "Login successfully", token });
  } catch (error) {
    return res.status(404).json({ error: "Something went wrong" });
  }
};
