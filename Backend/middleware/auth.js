const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const verifyToken = (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log(err.message);
      return res
        .status(500)
        .send({ auth: false, message: "Token is not valid" });
    }

    // if everything good, save to request for use in other routes
    req.userId = decoded.user.id;
    next();
  });
};

module.exports = verifyToken;
