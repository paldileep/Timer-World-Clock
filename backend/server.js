const cluster = require('cluster');
const os = require('os');
const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./db');
const routes = require('./routes');

dbConnect();

app.use(express.json());
app.use(cors());

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);


  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });

} 

else {


  app.use('/api/v1', routes);

  const port = process.env.PORT || 3000;

  app.use('/', (req, res) => {
    res.status(200).send('API is running');
  });

  app.listen(port, () => {
    console.log(`Worker ${process.pid} is running on port ${port}`);
  });
  
}