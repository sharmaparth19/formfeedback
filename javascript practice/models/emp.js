const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
      require:false
    },
    username: {
      type: String,
      require:true
    },
    category: {
        type:String,
        require:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);