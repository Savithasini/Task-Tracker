const { Router } = require("express");
const userServices = require("../services/user");
const router = Router({ strict: true });
const isAuth = require("../middleware/is-user");

router.post("/login", userServices.login);
router.post("/register", userServices.register);
router.get("/auth-user", isAuth, userServices.getAuthUser);
router.get("/user", userServices.getUsers)
module.exports = router;
