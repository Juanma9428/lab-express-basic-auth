const router = require("express").Router();

const miscController = require("../controllers/misc.controller")
const authController = require("../controllers/auth.controller")
const authMiddleweares = require("../middlewares/auth.middleware")
const userController = require ("../controllers/user.controller")
/* GET home page */
router.get("/", miscController.home)

router.get("/register", authMiddleweares.isNoAutenticated, authController.register)
router.post("/register", authMiddleweares.isNoAutenticated, authController.doRegister)
router.get("/login", authMiddleweares.isNoAutenticated, authMiddleweares.isNoAutenticated, authController.login)
router.post("/login", authMiddleweares.isNoAutenticated, authController.doLogin)
router.get("/logout",authController.logout)
router.get("/profile", authMiddleweares.isAutenticated, userController.profile)







module.exports = router;
