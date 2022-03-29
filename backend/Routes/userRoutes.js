const { searchUser__controller } = require("../Controller/userController");

const router = require("express").Router();
const { requireLogin } = require("../middleware/requireLogin");

router.get("/search-user", requireLogin, searchUser__controller);

module.exports = router;
