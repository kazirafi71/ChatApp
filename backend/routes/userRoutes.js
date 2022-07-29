const { register_controller } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register_controller);

module.exports = router;
