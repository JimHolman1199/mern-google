const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(keys.mongodb.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
      })
  
      console.log(`connected to mongoDB: ${conn.connection.host}`)
  
    } catch (error) {
      console.log(error)
    }
}

module.exports = connectDB;
