const mongoose = require('mongoose');

//code for db not to disconnect if its connect to the slected db

const connectDB = async (branch) => {
  try {
    const uri = process.env.MONGODB_URI;
    let defaultBranch = process.env.DEFAULT_BRANCH
    defaultBranch = branch || defaultBranch;
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log(`MongoDB disconnected`);
    }
    await mongoose.connect(uri + defaultBranch);
    console.log(`MongoDB connected to ${defaultBranch}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

