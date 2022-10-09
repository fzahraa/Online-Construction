const express = require("express");
const router = express.Router();
const { signupEn, signupAr, signinEn, signinAr, getUserEn, getUserAr, checkEmail} = require("../controllers/user");

const verifyToken = require("../middleware/auth");

router.route("/signupen").post(signupEn);
router.route("/signupar").post(signupAr);

router.route("/signinen").post(signinEn);
router.route("/signinar").post(signinAr);

router.route("/getuseren").get(verifyToken, getUserEn);
router.route("/getuserar").get(verifyToken, getUserAr);

router.route("/checkemail").post(checkEmail);

module.exports = router;

