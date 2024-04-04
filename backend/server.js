const express = require('express');
const app = express();

require('dotenv').config();

const cors = require("cors")



const dbConnect = require('./db')
dbConnect()

app.use(express.json());
app.use(cors())

const timerRoutes = require('./routes/timerRoutes')

app.use(timerRoutes);

const port = process.env.PORT

app.use('/', (req, res)=>{
    res.status(200).send('Api is running')
})

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});