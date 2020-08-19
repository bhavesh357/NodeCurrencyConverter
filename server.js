/**
 * @description importing express
 * @var {class} express class instance of express
 */
const express = require('express');

// importing swagger jsdoc and ui
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

/**
 * @description importing cors to allow cross origin requests
 * @var {class} cors 
 */
const cors = require('cors');

/**
 * @description importing express
 * @var {class} bodyParser class instance of body-parser
 */
const bodyParser= require('body-parser');

/**
 * @description importing winston logger
 * @var {class} logger 
 */
const logger = require('./config/logger');

/**
 * @description exporting instance of express
 * @var {class} app class instance of express
 */
module.exports = app = express();

// using bodyparser middleware to parse the url of json type
app.use(bodyParser.json());


//using cors to allow cross origin requests
app.use(cors());

/**
 * @description importing the db configuration
 */
require('./config/dbConfig');

/**
 * @description importing a instance of currency routes
 * passing app as param
 */
require('./routes/currencyRts')(app);

//swagger options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Currency Converter API',
            description: 'Currency Converter api to convert currencies',
            contact:{
                name: 'Bhavesh Kadam'
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ["./routes/currencyRts.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// checking if the server is running
app.listen(3000, () => {
    logger.info('server is listening on port 3000');
});
