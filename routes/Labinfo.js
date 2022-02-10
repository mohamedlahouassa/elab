require("dotenv").config();
const user = {
  id: 3,
  name: process.env.NAME,
  username: process.env.USER_NAME,
  password: process.env.USER_PASS,
};
module.exports.user = user;
