//mongoose connect
const mongoose = require("mongoose");
module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://ynniraj:Famlink123@cluster0.feexnks.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
// mongodb+srv://ynniraj:Famlink123@cluster0.feexnks.mongodb.net/
