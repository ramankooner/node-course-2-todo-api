const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({_id: '5bb982c0664e6c448b4e9e2b'}).then((todo) => {
//   console.log(todo);
// });

Todo.findByIdAndRemove('5bb982c0664e6c448b4e9e2b').then((todo) => {
  console.log(todo);
});
