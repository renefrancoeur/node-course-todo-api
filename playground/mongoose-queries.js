const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id ='5ae3a62a2f46b3aa00d1b102';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// User.find({
//   _id: id
// }).then((users) => {
//   console.log('Users', users);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then( (todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By id', todo);
}).catch((e) => console.log(e));


User.findById('5ad8e52e9d7e471d341c87ce').then((user) => {
  if(!user) {
    return console.log('Id not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
