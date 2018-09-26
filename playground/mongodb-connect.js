// cd /
// cd Program Files\MongoDB\Server\4.0
// cd bin
// mongod.exe --dbpath /Mongo/mongo-data

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'Raman', age: 25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
    // the return function just makes sure our function stops before we execute the other console.log
    // it prevents the rest of the fucntion from executing
  }
  console.log('Connected to MongoDB server');

  // insert one lets us insert a new document into our collection
  // takes two arguments, first is an argument, second is a callback
  // the callback function fires when things go well or there is an error
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   //_id: 123,
  //   name: 'Raman',
  //   age: '20',
  //   location: 'California'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});
