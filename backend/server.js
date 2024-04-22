const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();

const cors = require("cors")



const dbConnect = require('./db')
dbConnect()

app.use(express.json());
app.use(cors())
app.use(cookieParser());

const routes = require('./routes/index')

app.use('/api/v1', routes);

const port = process.env.PORT

app.use('/', (req, res)=>{
    res.status(200).send('Api is running')
})

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});