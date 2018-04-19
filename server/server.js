var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js'); //using ES6 get destructuring {} mongoose object from db/mongoose.js
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
//
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

//todo.save().then(() => {}, (e) =>{});
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });


});

app.listen(3000, () => {
  console.log('started on port 3000');
});



//
// //create a new instance
// var newTodo = new Todo({
//   text: 'Cook dinner tonight'
// });
//
// //save the newtodo to database
// newTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2))
// }, (e) => {
//   console.log('Unable to save todo ', e)
// });
//
//
//
// var newUser = new User({
//   email: 'renefrancoeur@yahoo.com'
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
