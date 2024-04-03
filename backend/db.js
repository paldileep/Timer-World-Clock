const mongoose = require('mongoose');

const uri = "xxx"
const dbConnect = async () => { 

    try {

      mongoose.connect(uri, {
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