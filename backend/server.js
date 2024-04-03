const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors")

const dbConnect = require('./db')
dbConnect()

app.use(express.json());
app.use(cors())

const timerRoutes = require('./routes/timerRoutes')

app.use(timerRoutes);


app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});