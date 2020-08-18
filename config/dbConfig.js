// db config

// importing mongoose to connect to db
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to db
mongoose.connect('mongodb://localhost:27017/currencies', {
    useNewUrlParser: true,
}).then( () => {
    logger.info('Successfully Connected to batabase');
}).catch( (err) => {
    logger.info('Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.connection.on('connected', () => {
    logger.info('mongoose connected');
});

mongoose.connection.on('disconnected', () => {
    logger.info('mongoose connection disconnected');
});

mongoose.connection.on('error', (err) => {
    logger.info(err.message);
});
