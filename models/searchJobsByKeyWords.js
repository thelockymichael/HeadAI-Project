const mongoose = require('mongoose')

const searchJobsByKeyWords = new mongoose.Schema({
  words: {
    type: String,
    validate: {
      validator: function (str) {
        return str.length > 1
      },
      message: 'Words field must have more than 1 character. ',
    },
  },
  area: {
    type: String,  validate: {
      validator: function (str) {
        return str.length > 2
      },
      message: 'Search area field must have more than 2 characters. ',
    },
  },
  time_range_start: {
    type: String,
    validate: {
      validator: function (str) {
        return str.length >= 7
      },
      message: 'Time range start must must have more than 7 characters. ',
    },
  },
  time: {
    type: Date,
    default: Date.now,
  },
})

searchJobsByKeyWords.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('SearchJobs', searchJobsByKeyWords)
