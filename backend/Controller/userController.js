const UserModel = require("../model/UserModel");

module.exports.searchUser__controller = async (req, res) => {
  try {
    const keywords = req.query.search
      ? {
          $or: [
            { userName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    // console.log(keywords);
    const users = await UserModel.find(keywords).find({
      _id: { $ne: req.user._id },
    });
    return res.status(200).json({ users });
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
};
