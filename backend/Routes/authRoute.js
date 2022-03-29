const { login_controller, register_controller } = require("../Controller/authController");

const router = require("express").Router();

router.post("/login", login_controller);
router.post("/register", register_controller);

module.exports = router;
