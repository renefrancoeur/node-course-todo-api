const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove()
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5af0d20f5f012b5f7145364d'}).then( (todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5af0d22c5f012b5f71453662').then((todo) => {
  console.log(todo);
});
