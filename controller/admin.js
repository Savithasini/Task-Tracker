const { Router } = require("express");
const isAuth = require("../middleware/is-admin");
const adminServices = require("../services/admin");
const router = Router({ strict: true });

router.post("/login1", adminServices.login);
router.get("/auth-admin", isAuth, adminServices.getAuthAdmin);
module.exports = router;
