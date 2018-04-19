const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5ad4f5e6b92c8d9ee26be4df')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((results) => {
  //   console.log(results);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5ad4e6224635d424143e0a33')
  }, {
    $set: {
      name: 'La La Moka'
    },
    $inc: {
      Age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
//  client.close();
});
