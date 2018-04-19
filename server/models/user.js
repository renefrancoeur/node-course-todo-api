var mongoose = require('mongoose');

//user model
//model, takes 2 arguments, (name, object)
// email, required, trim it, string minlength of 1
var User = mongoose.model('User',{
  email: {
  type: String,
  required: true,
  trim: true,
  minlength: 1
  }
});

module.exports = (User); // same as User = User
