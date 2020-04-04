const mongoose = require("mongoose");

const searchSkillSchema = new mongoose.Schema({
  skills: {
    type: Array,
    required: true,
    minlength: 1
  },
  time: {
    type: Date,
    default: Date.now
  }
});

searchSkillSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("SearchSkill", searchSkillSchema);
