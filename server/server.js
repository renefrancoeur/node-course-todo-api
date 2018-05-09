const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose.js'); //using ES6 get destructuring {} mongoose object from db/mongoose.js
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());


//post route
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

//get route
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});


//GET /todos/1234123
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    // Valid is use isValid
    //404send back empty Second
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }
  //findById
  //success
    //if todo send it back
    // if no todo send back 404 with empty body
    //error
    //400 and send empty body back
    Todo.findById(id).then((todo) => {
      if (!todo) {
         return res.status(404).send();
        }
      res.send({todo});
      }).catch( (e) => {
          res.status(400).send();
      });

});

app.delete('/todos/:id', (req, res) => {
  var id= req.params.id;  //get the id
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();  //validate the ID - return a 404
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();  //validate the ID - return a 404
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }


    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=> {
      if(!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
});



app.listen(port, () => {
  console.log(`started at port ${port}`);
});

module.exports = {app};


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
