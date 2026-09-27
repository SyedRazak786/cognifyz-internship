require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3006,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cognifyz_task6',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me'
};
