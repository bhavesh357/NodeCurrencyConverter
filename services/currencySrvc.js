// importing db schema
const Currency = require('../model/currencyModel');
const logger = require('../config/logger');


/**
 * @description greeting service to manupulate greeting data
 * @return {object} message
 */
module.exports = class currencyService {

    /**
     * @description function to get greeting by Id
     * @return {object} array of greetings
     */
    findAll(res,callback) {
        Currency.find()
            .then( (item) => {
                if (!item) {
                    throw new Error();
                }
                callback(res,item);
            }).catch( (err) => {
                callback(res,{'error':'Currencies not found'});
            });
    }

    /**
     * @description function to add the value
     * @param {object} reqBody body of the request
     * @param {object} res response 
     * @param {object} callback callback function
     */
    save(reqBody,res,callback){
        const currency = new Currency({
            shortName: reqBody.shortName,
            longName: reqBody.longName,
        });

        currency.save()
        .then((item) => {
            callback(res,item)
        })
        .catch((err) => {
            callback(res,{'error':'couldn\'t create currency'})
        });
    }

    /**
     * @description function to add the value
     * @param {object} reqBody body of the request
     * @param {object} res response 
     * @param {object} callback callback function
     */
    convert(reqBody,res,callback){
        logger.info(reqBody);
        callback(res,{'value':this.getRate(reqBody.currencyOne,reqBody.currencyTwo)});
    }

    /**
     * @description function to get rate
     * @param {object} currencyOne
     * @param {object} currencyTwo
     */
    getRate(currencyOne,currencyTwo){
        logger.info(currencyOne,currencyTwo);
        let value = this.convertToBase(currencyOne)/this.convertToBase(currencyTwo);
        logger.info(value);
        value= this.round(value);
        logger.info(value);
        return value;
    }

    /**
     * @description function to get converted to base unit
     * @param {object} currency
     */
    convertToBase(currency){
        logger.info(currency);
        switch(currency){
            case 'USD':
                return 74.5809;
            case 'EUR':
                return 89.3634;
            case 'GBP':
                return 99.0918;
            case 'INR':
                return 1;
            default:
                throw new Error('Invalid Currency'); 
        } 
    }

    round(value) {
        return Number((value).toFixed(4));;
    }

};

