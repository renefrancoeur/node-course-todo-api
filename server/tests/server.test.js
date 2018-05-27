const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');// ./ is for relative path ../ is to go back one step  server is for the server.js file
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');



//create an array of dummy todos for tests

beforeEach(populateUsers);
beforeEach(populateTodos);



describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos)=> {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create a to do with invalid data', (done) => {
    var text = '';

    request(app)
    .post('/todos')
    .send({text})// alternatively send an empty {}
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos)=> {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });

});


describe('GET/todos', () => {

  it('should get all todos', (done)=> {
    request(app)  //super test request
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });

});


describe('Get/todos/:id', () => {
      it('should return todo doc', (done) => {
        request(app)
          .get(`/todos/${todos[0]._id.toHexString()}`)  //need to convert the _id from the object to a string hence the toHexString()
          .expect(200)
          .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
          })
          .end(done);
      });

    it('Should return a 404 if todo not found', (done) => {
      var hexID = new ObjectID().toHexString();
      request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 for non-object ids', (done) => {
      var nonID = '123';
      request(app)
      .get(`/todos/${nonID}`)
      .expect(404)
      .end(done);
    });

});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      var hexId = todos[1]._id.toHexString();

      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect( (res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err,res)=> {
          if (err) {
            return done(err);
          }


          Todo.findById(hexId).then((todo) => {

            expect(todo).toBeFalsy();
            done();
          }).catch( (e) => done(e) );

        });
    });

    it('Should return a 404 if todo not found', (done) => {
      var hexID = new ObjectID().toHexString();
      request(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 for non-object ids', (done) => {
      var nonID = '123';
      request(app)
      .delete(`/todos/${nonID}`)
      .expect(404)
      .end(done);
    });

});

describe('PATCH /todos/:id', () => {
    it('Should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'new updated text';

      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: true
      })
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);

      //grab id of first item
      //update text set complete true
      //assert 200
      //assert response body equal to text change completed true , completed at is a number
    });

    it('Should clear completedAt when todo is not completes', (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'new updated text!!';

      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: false
      })
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);//grab id of second todo item
      // update text set completed to false
      //200
      //text is changed, completed falst Completed at is no .toBeFalsy
    });
});
console.log(users[0]);
console.log(users[1]);
describe('GET /users/me', () => {
  it('should return a user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect( (res) => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});


describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123mnb!';

    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect ((res) => {
      expect(res.headers['x-auth']).toBeTruthy(); //toExist doesn't exist anymore
      expect(res.body._id).toBeTruthy();
      expect(res.body.email).toBe(email);
    })
    .end((err) => {
      if (err) {
        return done(err);
      }
      User.findOne({email}).then((user) => {
        expect(user).toBeTruthy();
        expect(user.password).not.toBe(password);
        done();
      });
    });
  });

  it('should return validation errors if request invalid', (done) => {


    request(app)
    .post('/users')
    .send({
      email: 'and',
      password: 'short'
    }) //sending an existing users
    .expect(400)
    .end(done);
  });

  it('should not create user if email in use', (done) => {
    var existingemail = 'user@test.com';
    var existingpassword = 'userpassword1!';

        request(app)
        .post('/users')
        .send({existingemail,existingpassword}) //sending an existing users
        .expect(400)
        .end(done);
  });
});


describe('Post /users/login', () => {
  it ('should login user and return auth token', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password
    })
    .expect(200)
    .expect( (res) => {
      expect(res.headers['x-auth']).toBeTruthy();
    })
    .end((err,res) => {
      if(err) {
        return done(err);
      }

      User.findById(users[1]._id).then((user) => {
        expect(user.toObject().tokens[0]).toMatchObject({  //toObject returns the raw user data not the methods of Mongoose
          access: 'auth',
          token: res.headers['x-auth']
        });
        done();
      }).catch( (e) => done(e));

    });
  });

  it ('should reject invalid login', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password + '1'
    })
    .expect(400)
    .expect( (res) => {
      expect(res.headers['x-auth']).toBeFalsy();
    })
    .end((err,res) => {
      if(err) {
        return done(err);
      }

      User.findById(users[1]._id).then((user) => {
        expect(user.tokens.length).toBe(0);
        done();
      }).catch( (e) => done(e));

    });
  });


});
