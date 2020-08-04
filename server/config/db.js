const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
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
