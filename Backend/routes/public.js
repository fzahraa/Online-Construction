const express = require("express");
const router = express.Router();
const {
  searchUsersEn,
  searchUsersAr,
  searchAllProjectsEn,
  searchAllProjectsAr,
  searchProjectEn,
  searchProjectAr,
  searchUserByIdEn,
  searchUserByIdAr
} = require("../controllers/public");

//search users
router.route("/searchen/").get(searchUsersEn);
router.route("/searchar/").get(searchUsersAr);

router.route("/searchen/:profileId").get(searchUserByIdEn);
router.route("/searchar/:profileId").get(searchUserByIdAr);


router.route("/searchen/project/:profileId").get(searchAllProjectsEn);
router.route("/searchar/project/:profileId").get(searchAllProjectsAr);

router.route("/searchen/project/:profileId/:projectId").get(searchProjectEn);
router.route("/searchar/project/:profileId/:projectId").get(searchProjectAr);

module.exports = router;
