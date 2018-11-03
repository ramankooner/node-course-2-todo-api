var mongoose = require('mongoose');

// Mongoose Models
// First argument - string name
// Second argument - object
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1, // minimum length of string has to be one. prevents ''
    trim: true    // removes leading or trailing white space
  },
  completed: {
    type: Boolean,
    default: false // no need to create a todo if its already done
  },
  completedAt: { // only exists if todo is completed
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  }
});

module.exports = {Todo};
