exports.signUpValidation = (req, res, next) => {
  let { name, email, password, phoneNumber, role } = req.body;
  name = name.trim();
  email = email.trim();
  phoneNumber = phoneNumber.trim();
  password = password.trim();
  role = role.trim();

  if (name == "" || email == " " || password == "" || phoneNumber == "" || role == "") {
    return res.json({
      status: 400,
      message: "Empty  input fields",
    });
  } else if (password.length < 8) {
    return res.json({
      status: 400,
      message: "password is too short",
    });
  }
  next();
};

exports.signInValidation = (req, res, next) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == " " || password == "") {
    return res.json({
      status: 400,
      message: "Empty input fields",
    });
  } else if (password.length < 8) {
    return res.json({
      status: 400,
      message: "password is too short",
    });
  }
  next();
};


exports.createProfileValidation = (req, res, next) => {
  let {
    about,
    experience,
    resource,
    service_en,
    service_ar,
    contact,
    photo,
  } = req.body;
  if (
    about == {} ||
    experience == {} ||
    resource == {} ||
    service_en == {} ||
    service_ar == {} ||
    contact == {} ||
    photo == ""
  ) {
    return res.json({
      status: 400,
      message: `Please fill all the required fields `,
    });
  }
  next();
};

