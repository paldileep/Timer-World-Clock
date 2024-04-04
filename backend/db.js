const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => { 

    try {

      mongoose.connect(MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }).then(()=>{
          console.log('Connected to MongoDB');
      }).catch((err)=>{
          console.error('MongoDB connection error:', err);
      })
      
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect