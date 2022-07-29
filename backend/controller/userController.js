const UserModel = require("../model/UserModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

module.exports.register_controller = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Please enter required information's" });
    }

    const checkUser = await UserModel.findOne({ email });

    if (checkUser) {
      return res.status(404).json({ error: "user already exists" });
    } else {
      var hash_pass = bcrypt.hashSync(password, 12);
      var token = jwt.sign(
        {
          _id: checkUser._id,
          email: checkUser.email,
          username: checkUser.username,
        },
        process.env.TOKEN_KEY
      );
      const newUser = new UserModel({ email, username, password: hash_pass });
      const saveUser = await newUser.save();
      return res.status(201).json({ success: "Registration success", token });
    }
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports.login_controller = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res
        .status(400)
        .json({ error: "Please enter required information's" });
    }

    const checkUser = await UserModel.findOne({ email });

    if (!checkUser) {
      return res.status(404).json({ error: "User not exists" });
    } else {
      var check_pass = bcrypt.compareSync(password, checkUser.password);
      if (!check_pass) {
        return res.status(404).json({ error: "Invalid credentials" });
      }
      var token = jwt.sign(
        {
          _id: checkUser._id,
          email: checkUser.email,
          username: checkUser.username,
        },
        process.env.TOKEN_KEY
      );

      return res.status(201).json({ success: "Login success", token });
    }
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports.allUser_controller = async (req, res) => {
  try {
    const { currentUser } = req.params;
    const users = await UserModel.find({ _id: { $ne: currentUser } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.status(201).json(users);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
