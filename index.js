const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const contactsRouter = require('./contacts/contactsRouter');

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.listen(config.port, error => {
  error
    ? console.error(error)
    : console.log('Server started on port', config.port);
});
