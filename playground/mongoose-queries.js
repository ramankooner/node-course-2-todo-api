const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bb923d4db4247d856d56988';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// // returns one document at most
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// finds document by its id
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found'); // return prevents rest of function from happening
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));


User.findById('5bb85f9201f14edc4eb22d35').then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }

  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
