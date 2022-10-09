const express = require("express");
const router = express.Router();
const {
  createProfileEn,
  createProfileAr,
  addProjectEn,
  addProjectAr,
  deleteProjectEn,
  deleteProjectAr,
  updateProjectEn,
  updateProjectAr,
  updateProfileAr,
  updateProfileEn,
  takeReviewEn,
  takeReviewAr
} = require("../controllers/profile");

const verifyToken = require("../middleware/auth");

//create new profile
router
  .route("/createprofileen")
  .post(verifyToken, createProfileEn);
router
  .route("/createprofilear")
  .post(verifyToken, createProfileAr);

router.route("/addprojecten/:profileId").patch(verifyToken, addProjectEn);
router.route("/addprojectar/:profileId").patch(verifyToken, addProjectAr);

router
  .route("/deleteprojecten/:profileId/:projectId")
  .delete(verifyToken, deleteProjectEn);
router
  .route("/deleteprojectar/:profileId/:projectId")
  .delete(verifyToken, deleteProjectAr);


router.route("/updateprofileen/:profileId").patch(verifyToken, updateProfileEn);
router.route("/updateprofilear/:profileId").patch(verifyToken, updateProfileAr);

router
  .route("/updateprojecten/:profileId/:projectId")
  .patch(verifyToken, updateProjectEn);
router
  .route("/updateprojectar/:profileId/:projectId")
  .patch(verifyToken, updateProjectAr);

router.route("/reviewen/:profileId/:projectId").patch(takeReviewEn);
router.route("/reviewar/:profileId/:projectId").patch(takeReviewAr);

module.exports = router;
