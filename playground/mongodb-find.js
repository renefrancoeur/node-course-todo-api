const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5ad4c8e19376c4157c12bb36')
  // }).toArray().then((docs) =>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fectch todos', err);
  // });

  db.collection('Users').find({name: 'Rene'}).count().then((count) =>{
    console.log(`Users: ${count}`);
    }, (err) => {
    console.log('unable to fetch todos', err);
  });

  db.collection('Users').find({name: 'Rene'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });

//  client.close();
});
