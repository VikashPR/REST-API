const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

// *process.env.{anything} can access any variable from the .env file

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

// Accept Json object
app.use(express.json())

const subscribersRouter = require('./router/subscribers')
app.use('/subscribers', subscribersRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
