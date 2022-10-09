const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  about_en:
  {
    name: String,
    address: String,
    establishmentYear: String,
    registrationNumber: String,
    vision: String,
    highestMonetaryValue: String
  },
  about_ar:
  {
    name: String,
    address: String,
    establishmentYear: String,
    registrationNumber: String,
    vision: String,
    highestMonetaryValue: String
  },
  experience: {
    experience: String,
    projects: String
  },
  resource: {
    manpower: String,
    engineers: String,
    vehicles: String,
    workshops: String,
    subContractors: String,
  },
  service_en: {
    role: String,
    category: String,
    subCategory: String,
    region: String,
    city: [String]
  },
  service_ar: {
    role: String,
    category: String,
    subCategory: String,
    region: String,
    city: [String]
  },
  contact_en: {
    person: String,
    number: String
  },
  contact_ar: {
    person: String,
    number: String
  },
  photo: {
    type: String
  },
  crnVerified: {
    type: Boolean,
    default: false
  },
  portfolio: [
    {
      projectName: String,
      projectLocation: String,
      projectDescription: String,
      images: [
        {
          type: String,
        },
      ],
      review: String,
      noOfStars: {
        type: Number,
        default: 0,
      },
      reviewerName: String,
      reviewerPhoneNumber: String,
      reviewerTitle: String
    },
  ],
});

ProfileSchema.set("toObject", { virtuals: true });
ProfileSchema.set("toJSON", { virtuals: true });

ProfileSchema.virtual("stars").get(function () {
  if (!this.portfolio) return 0;
  let sum = 0;
  let average = 0;
  for (let i = 0; i < this.portfolio?.length; i++) {
    sum = sum + this.portfolio[i]?.noOfStars;
  }
  average = sum / this.portfolio?.length;
  return average;
});

const User = mongoose.model("Profile", ProfileSchema);

module.exports = User;
