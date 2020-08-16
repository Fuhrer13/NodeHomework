const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const contactsRouter = require('./contacts/contactsRouter');
const mongoose = require('mongoose');

async function main() {
  app.use(morgan('combined'));
  app.use(cors());
  app.use(express.json());

  app.use('/api/contacts', contactsRouter);

  try {
    await mongoose.connect(config.mongodb_url);
    console.log('Database connection successful');
  } catch (error) {
    process.exit(1);
  }

  app.listen(config.port, error => {
    error
      ? console.error(error)
      : console.log('Server started on port', config.port);
  });
}
main();
