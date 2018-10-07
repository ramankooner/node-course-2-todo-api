var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://ramankooner:proahrigg1417@ds225253.mlab.com:25253/nodetodo'
// };
// mongoose.connect(process.env.PORT ? db.mblab : db.localhost);

module.exports = {mongoose};
