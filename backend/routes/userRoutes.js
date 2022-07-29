const {
  register_controller,
  login_controller,
  allUser_controller,
} = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register_controller);
router.post("/login", login_controller);
router.get("/all-users/:currentUser", allUser_controller);

module.exports = router;
