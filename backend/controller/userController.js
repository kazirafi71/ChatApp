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
      var token = jwt.sign({ foo: "bar" }, process.env.TOKEN_KEY);
      const newUser = new UserModel({ email, username, password: hash_pass });
      const saveUser = await newUser.save();
      return res.status(201).json({ success: "Registration success", token });
    }
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
