//mongodb user
const Profile = require("../models/profile");
const url = require("url");

//@desc      Searching Users
//@route     Get /public/searchen
//@access    Public

exports.searchUsersEn = async (req, res) => {
  const { role, category, region, city, subCategory } = url.parse(
    req.url,
    true
  ).query;
  try {
    let profiles;
    if (subCategory === "All SubCategories") {
      profiles = await Profile.find({
        "service_en.role":  role,
        "service_en.category":  category,
        "service_en.region":  region,
        "service_en.city":  city,
      })
        .select({ "about_en.name": 1, "portfolio.noOfStars": 1, stars: 1, photo: 1 });

    }
    else {
      profiles = await Profile.find({
        "service_en.role":  role,
        "service_en.category":  category,
        "service_en.subCategory":  subCategory,
        "service_en.region":  region,
        "service_en.city":  city,
      })
        .select({ "about_en.name": 1, "portfolio.noOfStars": 1, stars: 1, photo: 1 });
    }

    if (profiles.length < 1) {
      return res.json({
        status: "FAILURE",
        message: `No ${role} registered in this category`,
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "Successful request",
      data: profiles,
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
    });
  }
};

//@desc      Searching Users
//@route     Get /public/searchar
//@access    Public

exports.searchUsersAr = async (req, res) => {
  const { role, category, region, city, subCategory } = url.parse(
    req.url,
    true
  ).query;
  try {

    let profiles;

    if (subCategory === "جميع الفئات الفرعية") {
      profiles = await Profile.find({
        "service_ar.role":  role,
        "service_ar.category":  category,
        "service_ar.region":  region,
        "service_ar.city":  city,
      })
        .select({ "about_ar.name": 1, "portfolio.noOfStars": 1, stars: 1, photo: 1 });
    }
    else {
      profiles = await Profile.find({
        "service_ar.role":  role,
        "service_ar.category":  category,
        "service_ar.subCategory":  subCategory,
        "service_ar.region":  region,
        "service_ar.city":  city,
      })
        .select({ "about_ar.name": 1, "portfolio.noOfStars": 1, stars: 1, photo: 1 });
    }

    if (profiles.length < 1) {
      return res.json({
        status: "FAILURE",
        message: `لم يتم تسجيل ${role} في هذه الفئة`,
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "طلب ناجح",
      data: profiles,
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
    });
  }
};


//@desc      Searching User
//@route     Get /public/searchen/:profileId
//@access    Public

exports.searchUserByIdEn = async (req, res) => {
  try {
    const user = await Profile.findById(req.params.profileId)
      .select({
        about_en: 1,
        experience: 1,
        resource: 1,
        service_en: 1,
        contact_en: 1,
        photo: 1,
        crnVerified: 1,
        portfolio: 1,
        stars: 1,
      });

    if (!user) {
      return res.json({
        status: "FAILURE",
        message: "No user with Given Id exists",
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "Successful request",
      data: { user, noOfProjects: user.portfolio.length },
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
    });
  }
};


//@desc      Searching User
//@route     Get /public/searchar/:profileId
//@access    Public

exports.searchUserByIdAr = async (req, res) => {
  try {
    const user = await Profile.findById(req.params.profileId)
      .select({
        about_ar: 1,
        experience: 1,
        resource: 1,
        service_ar: 1,
        contact_ar: 1,
        photo: 1,
        crnVerified: 1,
        portfolio: 1,
        stars: 1,
      });
    if (!user) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "طلب ناجح",
      data: { user, noOfProjects: user.portfolio.length },
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
    });
  }
};

//@desc      Searching All projects of a User
//@route     Get /public/searchen/project/:profileId
//@access    Public

exports.searchAllProjectsEn = async (req, res) => {
  try {
    const projects = await Profile.findById(req.params.profileId)
      .select({
        "service_en.role": 1,
        "about_en.name": 1,
        "portfolio.projectName": 1,
        "portfolio.projectLocation": 1,
        "portfolio.noOfStars": 1,
        "portfolio._id": 1,
        photo: 1,
      });

    if (!projects) {
      return res.json({
        status: "FAILURE",
        message: "No user with Given Id exists",
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "Successful request",
      data: { projects, noOfProjects: projects.portfolio.length },
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
    });
  }
};


//@desc      Searching All projects of a User
//@route     Get /public/searchar/project/:profileId
//@access    Public

exports.searchAllProjectsAr = async (req, res) => {
  try {
    const projects = await Profile.findById(req.params.profileId)
      .select({
        "service_ar.role": 1,
        "about_ar.name": 1,
        "portfolio.projectName": 1,
        "portfolio.projectLocation": 1,
        "portfolio.noOfStars": 1,
        "portfolio._id": 1,
        photo: 1,
      });

    if (!projects) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "طلب ناجح",
      data: { projects, noOfProjects: projects.portfolio.length },
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
    });
  }
};

//@desc      Searching one project of a User
//@route     Get /public/searchen/project/:profileId/:projectId
//@access    Public

exports.searchProjectEn = async (req, res) => {
  try {
    const project = await Profile.findOne(
      { _id: req.params.profileId },
      { _id: 0, portfolio: { $elemMatch: { _id: req.params.projectId } } }
    ).select({
      "service_en.role": 1,
      "about_en.name": 1,
      stars: 1,
      photo: 1,
    });

    if (!project) {
      return res.json({
        status: "FAILURE",
        message: "No user with Given Id exists",
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "Successful request",
      data: project,
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
    });
  }
};


//@desc      Searching one project of a User
//@route     Get /public/searchar/project/:profileId/:projectId
//@access    Public

exports.searchProjectAr = async (req, res) => {
  try {
    const project = await Profile.findOne(
      { _id: req.params.profileId },
      { _id: 0, portfolio: { $elemMatch: { _id: req.params.projectId } } }
    ).select({
        "service_ar.role": 1,
        "about_ar.name": 1,
        stars: 1,
        photo: 1,
      });

    if (!project) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود",
      });
    }
    return res.json({
      status: "SUCCESS",
      message: "طلب ناجح",
      data: project,
    });
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
    });
  }
};