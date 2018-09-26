const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // // deleteMany
  // db.collection('Users').deleteMany({name: 'Raman'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5ba42e8702581040743901d0")
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

//  db.close();
});
