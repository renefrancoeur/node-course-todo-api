var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');//'protocol +url+ port and database'

module.exports = {mongoose};
