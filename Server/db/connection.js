const mongoose = require('mongoose');


const connectDB = async (branch) => {
  try {
    const uri = process.env.MONGODB_URI;
    let defaultBranch = process.env.DEFAULT_BRANCH
    defaultBranch = branch || defaultBranch;
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    await mongoose.connect(uri + defaultBranch);
    console.log(`MongoDB connected to ${defaultBranch}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

