const ChatModel = require("../model/ChatModel");
const UserModel = require("../model/UserModel");

module.exports.accessChat__controller = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(200).json({ error: "Invalid credentials" });
    }

    var isChat = await ChatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMsg");

    isChat = await UserModel.populate(isChat, {
      path: "latestMsg.sender",
      select: "userName email",
    });

    if (isChat.length > 0) {
      return res.status(200).json(isChat[0]);
    } else {
      const chatData = new ChatModel({
        chatName: "test chat",
        users: [req.user._id, userId],
      });

      const saveChat = await chatData.save();
      const fullChat = await ChatModel.findOne({ _id: saveChat._id }).populate(
        "users",
        "-password"
      );
      return res
        .status(200)
        .json({ success: "New chat created successfully", fullChat });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.getAllChats__controller = async (req, res) => {
  try {
    const allChats = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMsg")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });
    return res.status(200).json(allChats);
  } catch (error) {
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.createGroupChat__controller = async (req, res) => {
  try {
    const { chatName, users } = req.body;
    if (!chatName || !users) {
      res.status(400).json({ error: "Please provide required info" });
    }
    var userInfo = JSON.parse(users);

    if (userInfo.length < 2) {
      return res.status(400).json({ error: "More than 2users are required" });
    }
    userInfo.push(req.user._id);

    const newGroupChat = new ChatModel({
      chatName,
      users: userInfo,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const saveNewGroup = await newGroupChat.save();

    const getChatInfo = await ChatModel.findOne({
      _id: saveNewGroup._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(getChatInfo);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.renameGroup__controller = async (req, res) => {
  try {
    const { chatName, chatId } = req.body;
    const updateChat = await ChatModel.findOneAndUpdate(
      {
        _id: chatId,
      },
      { $set: { chatName } },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: "Group name updated successfully", updateChat });
  } catch (error) {
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.removeGroupChat__controller = async (req, res) => {
  try {
    const { userId, chatId } = req.body;

    const remove = await ChatModel.findOneAndUpdate(
      {
        _id: chatId,
      },
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json(remove);
  } catch (error) {
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.addGroupChat__controller = async (req, res) => {
  try {
    const { userId, chatId } = req.body;
    const checkUser = await ChatModel.findOne({ _id: chatId, users: userId });
    if (checkUser) {
      return res.status(200).json({ success: "User already exists" });
    }

    const addNew = await ChatModel.findOneAndUpdate(
      {
        _id: chatId,
      },
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res
      .status(200)
      .json({ success: "New user added successfully", addNew });
  } catch (error) {
    return res.status(404).json({ error: "Something went wrong" });
  }
};
