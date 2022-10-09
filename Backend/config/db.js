const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const mongoose = require("mongoose");

console.log("in db file");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`Mongo DB is connected : ${conn.connection.host}`);
};

module.exports = connectDB;
