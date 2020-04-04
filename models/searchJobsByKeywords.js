const mongoose = require("mongoose");

const searchJobsByKeyWords = new mongoose.Schema({
  words: {
    type: String,
    required: true,
    minlength: 1
  },
  area: {
    type: String,
    required: true,
    minlength: 2
  },
  time_range_start: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

searchJobsByKeyWords.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("SearchJobs", searchJobsByKeyWords);
