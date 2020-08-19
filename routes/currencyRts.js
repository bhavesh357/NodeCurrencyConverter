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
    /**
    * @swagger
    * /currency:
    *  get:
    *      description: Used to get all curencies
    *      responses:
    *          '200':
    *              description: A Successful response
    */
    app.get('/currency/', currency.findAll);
    
    /**
    * @swagger
    * /currency/convert:
    *  get:
    *      description: Used to get conversion rate
    *      parameters:
    *       - in: body
    *         schema:
    *              type: object
    *              jsonEditor: true
    *              properties: 
    *                  currencyOne: 
    *                       type: string
    *                  currencyTwo:
    *                        type: string
    *      responses:
    *          '200':
    *              description: A Successful response
    */
    app.get('/currency/convert', currency.convert);
    
    app.post('/currency/', currency.add );
};

