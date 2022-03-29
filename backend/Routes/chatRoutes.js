const {
  createGroupChat__controller,
  removeGroupChat__controller,
  renameGroup__controller,
  addGroupChat__controller,
  accessChat__controller,
  getAllChats__controller,
} = require("../Controller/chatController");
const { requireLogin } = require("../middleware/requireLogin");

const router = require("express").Router();

router.post("/access-chat", requireLogin, accessChat__controller);
router.get("/get-all-chats", requireLogin, getAllChats__controller);
router.post("/create-group-chat", requireLogin, createGroupChat__controller);
router.put("/rename-group", requireLogin, renameGroup__controller);
router.put("/remove-group-chat", requireLogin, removeGroupChat__controller);
router.put("/add-group-chat", requireLogin, addGroupChat__controller);

module.exports = router;
