const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');// ./ is for relative path ../ is to go back one step  server is for the server.js file
const {Todo} = require('./../models/todo');

//create an array of dummy todos for tests
const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then( () => {
      Todo.insertMany(todos);
    }).then( () => done() );
});

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
