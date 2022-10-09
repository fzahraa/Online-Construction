const express = require("express");
const router = express.Router();
const { searchNonVerifiedUsers, searchVerifiedUsers, updateProfile } = require("../controllers/admin");


router.route("/searchNonVerified").get(searchNonVerifiedUsers);
router.route("/searchVerified").get(searchVerifiedUsers);
router.route("/updateProfile").patch(updateProfile);

module.exports = router;

