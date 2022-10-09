const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name_en: {
    type: String,
  },
  name_ar: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role_en: {
    type: String,
    enum: ["Maintenance", "Contractor", "Designer", "Consultant"],
  },
  role_ar: {
    type: String,
    enum: ["صيانة", "مقاول", "مصمم", "استشاري"],
  },
  profileId: String,
  profile: {
    type: Boolean,
    default: false,
  },
  
});
const User = mongoose.model("User", UserSchema);

module.exports = User;

