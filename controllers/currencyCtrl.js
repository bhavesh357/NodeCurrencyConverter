// importing service
const Service = require('../services/currencySrvc.js');

// creating a instance of service
const currency = new Service();

/**
* @description a greeting controller that contains
*      method to manupulate greetings
*/
module.exports = class currencyController {

    /**
    * @description a function to find the all greeting
    * @param {object} req
    * @param {object} res
    */
    findAll(req, res) {
        try {
            currency.findAll(res,(res,item) => {res.send(item)});
        } catch (err) {
            res.status(500).send(err);
        }
    }

    add(req, res){
        try {
            currency.save(req.body , res,(res,item) => {res.send(item)});
        } catch (err) {
            res.status(500).send(err);
        }
    }
  
};
