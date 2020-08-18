/**
 * @description importing currency controller
 * @var {class} currency class instance of currency Controller
 */
const Controller = require('../controllers/currencyCtrl');

// creating a instance of controller
const currency= new Controller();

/**
 * @description Exports greeting routes
 * @param {function} app that takes http requests
 */
module.exports = (app) => {
    app.get('/currency/', currency.findAll);

    app.post('/currency/', currency.add );
};

