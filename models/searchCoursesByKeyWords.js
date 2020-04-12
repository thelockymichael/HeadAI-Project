const mongoose = require('mongoose')

const searchCoursesByKeyWords = new mongoose.Schema({
  skill: {
    type: String,
    validate: {
      validator: function (str) {
        return str.length > 1
      },
      message: 'Skills field must contain more than 1 letter. ',
    },
  },
  lang: {
    type: String, validate: {
      validator: function (str) {
        return (str.length <= 3) & (str.length >= 2)
      },
      message: 'Language code must contain only 2-3 letters. ',
    },
  },
  limit: {
    type: Number,
    validate: {
      validator: function (num) {
        return num > 0 && num <= 10
      },
      message: 'Limit must be between 1-10. ',
    },
  },
  time: {
    type: Date,
    default: Date.now,
  },
})

searchCoursesByKeyWords.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('SearchCourses', searchCoursesByKeyWords)
