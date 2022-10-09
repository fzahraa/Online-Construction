//mongodb user
const User = require("../models/user");
const Profile = require("../models/profile");
const translate = require('@vitalets/google-translate-api');

require("dotenv").config();

//@desc      Create Profile
//@route     Post /profile/createprofileen
//@access    Private

exports.createProfileEn = async (req, res) => {

  let {
    about,
    experience,
    resource,
    service_en,
    service_ar,
    contact,
    photo,
  } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        status: "FAILURE",
        message: `No user with ID ${req.userId} exists `,
      });
    } else if (user.role == "user") {
      return res.json({
        status: "FAILURE",
        message: `User of this role is not allowed to create a profile `,
      });
    } else if (user.profile == "true" || user.profile == true) {
      return res.json({
        status: "FAILURE",
        message: `This user already has a profile `,
      });
    }

    translate(about.name, { from: 'en', to: 'ar', client: 'gtx' }).then((res1) => {
      translate(about.address, { from: 'en', to: 'ar', client: 'gtx' }).then((res2) => {
        translate(about.vision, { from: 'en', to: 'ar', client: 'gtx' }).then((res3) => {
          translate(contact.person, { from: 'en', to: 'ar', client: 'gtx' }).then((res4) => {

            const newProfile = new Profile({
              user: req.userId,
              about_en: about,
              about_ar: {
                name: res1.text,
                address: res2.text,
                establishmentYear: about.establishmentYear,
                registrationNumber: about.registrationNumber,
                vision: res3.text,
                highestMonetaryValue: about.highestMonetaryValue
              },
              experience,
              resource,
              service_en,
              service_ar,
              contact_en: contact,
              contact_ar: {
                person: res4.text,
                number: contact.number
              },
              photo
            });

            newProfile
              .save()
              .then(async (profile) => {
                const update = { profile: "true", profileId: profile.id };
                await User.findByIdAndUpdate(req.userId, update, {
                  new: true,
                });

                return res.json({
                  status: "SUCCESS",
                  message: "Profile Created",
                });
              })
              .catch((err) => {
                return res.json({
                  status: "FAILURE",
                  message: "An error occured while saving user profile",
                  error: err.message,
                });
              });
          })
        })
      })
    })
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message,
    });
  }
};

//@desc      Create Profile
//@route     Post /profile/createprofilear
//@access    Private

exports.createProfileAr = async (req, res) => {

  let {
    about,
    experience,
    resource,
    service_en,
    service_ar,
    contact,
    photo,
  } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        status: "FAILURE",
        message: `لا يوجد مستخدم بالمعرف ${req.userId} `,
      });
    } else if (user.role == "المستعمل") {
      return res.json({
        status: "FAILURE",
        message: `لا يُسمح لمستخدم هذا الدور بإنشاء ملف تعريف`,
      });
    } else if (user.profile == "true" || user.profile == true) {
      return res.json({
        status: "FAILURE",
        message: `هذا المستخدم لديه بالفعل ملف تعريف`,
      });
    }

    translate(about.name, { from: 'ar', to: 'en', client: 'gtx' }).then((res1) => {
      translate(about.address, { from: 'ar', to: 'en', client: 'gtx' }).then((res2) => {
        translate(about.vision, { from: 'ar', to: 'en', client: 'gtx' }).then((res3) => {
          translate(contact.person, { from: 'ar', to: 'en', client: 'gtx' }).then((res4) => {

            const newProfile = new Profile({
              user: req.userId,
              about_en: {
                name: res1.text,
                address: res2.text,
                establishmentYear: about.establishmentYear,
                registrationNumber: about.registrationNumber,
                vision: res3.text,
                highestMonetaryValue: about.highestMonetaryValue
              },
              about_ar: about,
              experience,
              resource,
              service_en,
              service_ar,
              contact_en: {
                person: res4.text,
                number: contact.number
              },
              contact_ar: contact,
              photo
            });

            newProfile
              .save()
              .then(async (profile) => {
                const update = { profile: "true", profileId: profile.id };
                await User.findByIdAndUpdate(req.userId, update, {
                  new: true,
                });
                return res.json({
                  status: "SUCCESS",
                  message: "تم إنشاء الملف الشخصي",
                });
              })
              .catch((err) => {
                return res.json({
                  status: "FAILURE",
                  message: "حدث خطأ أثناء حفظ ملف تعريف المستخدم",
                  error: err.message,
                });
              });
          })
        })
      })
    })
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message,
    });
  }
};

//@desc      Update Profile
//@route     Patch /profile/updateprofileen/:profileId
//@access    Private


exports.updateProfileEn = async (req, res) => {
  let { userName, companyName, companyAddress, companyVision } = req.body;
  try {
    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No user with given id exists",
      });
    }
    const user = await User.findById(profile.user);

    translate(userName, { from: 'en', to: 'ar', client: 'gtx' }).then((res1) => {
      translate(companyName, { from: 'en', to: 'ar', client: 'gtx' }).then((res2) => {
        translate(companyAddress, { from: 'en', to: 'ar', client: 'gtx' }).then((res3) => {
          translate(companyVision, { from: 'en', to: 'ar', client: 'gtx' }).then((res4) => {

            const update = {
              name_en: userName,
              name_ar: res1.text,
              email: req.body.email,
              role_en: req.body.roleEn,
              role_ar: req.body.roleAr
            };

            User.findByIdAndUpdate(user._id, update, {
              new: true,
            }).then((responseUser) => {
              Profile.findByIdAndUpdate(
                req.params.profileId,
                {
                  "about_en.name": companyName,
                  "about_en.address": companyAddress,
                  "about_en.vision": companyVision,
                  
                  "about_ar.name": res2.text,
                  "about_ar.address": res3.text,
                  "about_ar.vision": res4.text,

                  "service_en.role": req.body.roleEn,
                  "service_en.category": req.body.categoryEn,
                  "service_en.subCategory": req.body.subCategoryEn,

                  "service_ar.role": req.body.roleAr,
                  "service_ar.category": req.body.categoryAr,
                  "service_ar.subCategory": req.body.subCategoryAr,

                  "contact_en.number": req.body.contactNumber,

                  "contact_ar.number": req.body.contactNumber,

                  photo: req.body.profilePhoto
                },
                { new: true, }
              ).then((responseProfile) => {
                console.log(responseProfile);
                if (responseUser && responseProfile) {
                  return res.json({
                    status: "SUCCESS",
                    message: "Profile Updated",
                    profile: responseProfile,
                    user: responseUser,
                  });
                }
              });
            });

          })
        })
      })
    })

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
    });
  }
};

//@desc      Update Profile
//@route     Post /profile/updateprofilear/:profileId
//@access    Private


exports.updateProfileAr = async (req, res) => {
  let { userName, companyName, companyAddress, companyVision } = req.body;

  try {
    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    const user = await User.findById(profile.user);

    translate(userName, { from: 'ar', to: 'en', client: 'gtx' }).then((res1) => {
      translate(companyName, { from: 'ar', to: 'en', client: 'gtx' }).then((res2) => {
        translate(companyAddress, { from: 'ar', to: 'en', client: 'gtx' }).then((res3) => {
          translate(companyVision, { from: 'ar', to: 'en', client: 'gtx' }).then((res4) => {

            const update = {
              name_en: res1.text,
              name_ar: userName,
              email: req.body.email,
              role_en: req.body.roleEn,
              role_ar: req.body.roleAr
            };

            User.findByIdAndUpdate(user._id, update, {
              new: true,
            }).then((responseUser) => {
              Profile.findByIdAndUpdate(
                req.params.profileId,
                {
                  "about_en.name": res2.text,
                  "about_en.address": res3.text,
                  "about_en.vision": res4.text,

                  "about_ar.name": companyName,
                  "about_ar.address": companyAddress,
                  "about_ar.vision": companyVision,

                  "service_en.role": req.body.roleEn,
                  "service_en.category": req.body.categoryEn,
                  "service_en.subCategory": req.body.subCategoryEn,

                  "service_ar.role": req.body.roleAr,
                  "service_ar.category": req.body.categoryAr,
                  "service_ar.subCategory": req.body.subCategoryAr,

                  "contact_en.number": req.body.contactNumber,

                  "contact_ar.number": req.body.contactNumber,

                  photo: req.body.profilePhoto
                },
                { new: true }
              ).then((responseProfile) => {
                console.log(responseProfile);
                if (responseUser && responseProfile) {
                  return res.json({
                    status: "SUCCESS",
                    message: "تحديث الملف الشخصي",
                    profile: responseProfile,
                    user: responseUser,
                  });
                }
              });
            });

          })
        })
      })
    })

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
    });
  }
};

//@desc      Add Project in an existing profile
//@route     Patch /profile/addprojecten
//@access    Private


exports.addProjectEn = async (req, res) => {

  const project = req.body;
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: 404,
        message: "No user with given id exists",
      });
    }
    let updatedProfile;
    try {
      updatedProfile = await Profile.findByIdAndUpdate(
        req.params.profileId,
        { $push: { portfolio: project } },
        { safe: true, upsert: true, new: true }
      );
    } catch (err) {
      console.log(err);
      return res.json({
        status: "FAILURE",
        message: "An error occured while saving project",
        error: err.message,
      });
    }
    const user = await User.findById(profile.user);
    if (profile) {
      return res.json({
        status: "SUCCESS",
        message: "Project Added",
        profile: updatedProfile,
        user: user,
      });
    }
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message,
    });
  }
};



//@desc      Add Project in an existing profile
//@route     Patch /profile/addprojectar
//@access    Private


exports.addProjectAr = async (req, res) => {
  const project = req.body;
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: 404,
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    let updatedProfile;
    try {
      updatedProfile = await Profile.findByIdAndUpdate(
        req.params.profileId,
        { $push: { portfolio: project } },
        { safe: true, upsert: true, new: true }
      );
    } catch (err) {
      return res.json({
        status: "FAILURE",
        message: "حدث خطأ أثناء حفظ المشروع",
        error: err.message,
      });
    }
    const user = await User.findById(profile.user);
    if (profile) {
      return res.json({
        status: "SUCCESS",
        message: "تمت إضافة المشروع",
        profile: updatedProfile,
        user: user,
      });
    }
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message,
    });
  }
};


//@desc      delete Project of a existing profile
//@route     Patch /profile/deleteProjecten
//@access    Private

exports.deleteProjectEn = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No user with given id exists",
      });
    }
    const user = await User.findById(profile.user);
    let updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $pull: { portfolio: { _id: req.params.projectId } } },
      { new: true },
      (err, doc) => {
        if (err) {
          return res.json({
            status: "FAILURE",
            message: "An error occured while deleting project",
          });
        } else {
          //console.log("doc ", doc);
        }
      }
    ).clone();
    if (updatedProfile) {
      return res.json({
        status: "SUCCESS",
        message: "Project Deleted",
        profile: updatedProfile,
        user: user,
      });
    }
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
    });
  }
};



//@desc      delete Project of a existing profile
//@route     Patch /profile/deleteProjectar
//@access    Private

exports.deleteProjectAr = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    const user = await User.findById(profile.user);
    let updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $pull: { portfolio: { _id: req.params.projectId } } },
      { new: true },
      (err, doc) => {
        if (err) {
          return res.json({
            status: "FAILURE",
            message: "حدث خطأ أثناء حذف المشروع",
          });
        } else {
          //console.log("doc ", doc);
        }
      }
    ).clone();
    if (updatedProfile) {
      return res.json({
        status: "SUCCESS",
        message: "تم حذف المشروع",
        profile: updatedProfile,
        user: user,
      });
    }
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
    });
  }
};



exports.updateProjectEn = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No user with given id exists",
      });
    }
    const user = await User.findById(profile.user);
    let updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.projectName": req.body.projectName,
          "portfolio.$.projectLocation": req.body.projectLocation,
          "portfolio.$.projectDescription": req.body.projectDescription,
          "portfolio.$.images": req.body.images,
        },
      }
    );
    const newProfile = await Profile.findById(req.params.profileId);
    if (updatedProfile) {
      return res.json({
        status: "SUCCESS",
        message: "Project Updated",
        profile: newProfile,
        user: user,
      });
    }
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message,
    });
  }
};



exports.updateProjectAr = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    const user = await User.findById(profile.user);
    let updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.projectName": req.body.projectName,
          "portfolio.$.projectLocation": req.body.projectLocation,
          "portfolio.$.projectDescription": req.body.projectDescription,
          "portfolio.$.images": req.body.images,
        },
      }
    );
    const newProfile = await Profile.findById(req.params.profileId);
    if (updatedProfile) {
      return res.json({
        status: "SUCCESS",
        message: "تم تحديث المشروع",
        profile: newProfile,
        user: user,
      });
    }
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message,
    });
  }
};

//@desc      take review on a specific project
//@route     Patch /profile/reviewen/:profileId/:projectId
//@access    Private

exports.takeReviewEn = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No user with given id exists",
      });
    }
    const user = await User.findById(profile.user);
    await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.review": req.body.review,
          "portfolio.$.noOfStars": req.body.stars,
          "portfolio.$.reviewerName": req.body.name,
          "portfolio.$.reviewerPhoneNumber": req.body.phoneNumber,
          "portfolio.$.reviewerTitle": req.body.title,
        },
      },
      { new: true }
    );
    const newProfile = await Profile.findById(req.params.profileId);
    return res.json({
      status: "SUCCESS",
      message: "Profile Updated",
      profile: newProfile,
      user: user,
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message,
    });
  }
};

//@desc      take review on a specific project
//@route     Patch /profile/reviewar/:profileId/:projectId
//@access    Private

exports.takeReviewAr = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    const user = await User.findById(profile.user);
    await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.review": req.body.review,
          "portfolio.$.noOfStars": req.body.stars,
          "portfolio.$.reviewerName": req.body.name,
          "portfolio.$.reviewerPhoneNumber": req.body.phoneNumber,
          "portfolio.$.reviewerTitle": req.body.title,
        },
      },
      { new: true }
    );
    const newProfile = await Profile.findById(req.params.profileId);
    return res.json({
      status: "SUCCESS",
      message: "تحديث الملف الشخصي",
      profile: newProfile,
      user: user,
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message,
    });
  }
};

