var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp') //set in enverionment under server.js other environment variables
//'protocol +url+ port and database'

module.exports = {mongoose};
