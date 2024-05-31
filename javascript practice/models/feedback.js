const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      require:true
    },
    gender: {
      type: String,
      require:true
    },
    category: {
        type:String,
        require:true
    },
    pdf: {
      type: String 
    },
    pic: {
      type: String 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);