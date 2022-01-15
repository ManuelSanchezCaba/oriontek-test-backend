const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//Initialize and Error Endpoint
const { notFoundEndpoint } = require('./middlewares/error.middleware');
const { createRoles } = require('./libs/initialSetup');

const app = express();

//initial setups
createRoles();

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/company', require('./routes/company.routes'));
app.use('/client', require('./routes/client.routes'));
app.use('/companyClient', require('./routes/company_client.routes'));
app.use('/representative', require('./routes/representative.routes'));
app.use('/address', require('./routes/address.routes'));
app.use(require('./routes/auth.routes'));
app.use(notFoundEndpoint);

module.exports = app;
