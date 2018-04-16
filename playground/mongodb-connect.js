//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //identical code using destructuring

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'rene', age:46};  destructuring example
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
  //
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   Completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //
  // });

//insert new doc into Users (name, age, location)

  // db.collection('Users').insertOne({
  //   name: 'Rene',
  //   Age: 46,
  //   Location: 'East Windsor'
  // },  (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  //
  // });

  client.close();
});
