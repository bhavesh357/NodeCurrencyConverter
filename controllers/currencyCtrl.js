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
    * @description a function to find the all currency
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

    /**
     * @description a function to add currency
     * @param {object} req request
     * @param {object} res response
     */
    add(req, res){
        try {
            currency.save(req.body , res,(res,item) => {res.send(item)});
        } catch (err) {
            res.status(500).send(err);
        }
    }

    /**
     * @description a function to get converted currency
     * @param {object} req request
     * @param {object} res response
     */
    convert(req, res){
        try{
            currency.convert(req.body,res,(res,item) => {res.send(item)});
        }catch (err){
            res.status(500).send(err);
        }
    }
  
};
