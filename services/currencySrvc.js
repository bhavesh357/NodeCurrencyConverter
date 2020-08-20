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
            currentRate: reqBody.currentRate,
            previousRate: reqBody.previousRate
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
    async convert(reqBody,res,callback){
        try{
            logger.info(reqBody);
            let values = await this.getRate(reqBody.currencyOne,reqBody.currencyTwo);
            callback(res,{
                'value':values[0],
                'previousValue':values[1]
            });
        }catch (err){
            callback(res,res.status(500).send({'error':err.message}));
        }
    }
    
    /**
    * @description function to get rate
    * @param {object} currencyOne
    * @param {object} currencyTwo
    */
    async getRate(currencyOne,currencyTwo){
        logger.info(currencyOne,currencyTwo);
        let currencyOneRate;
        let currencyTwoRate;
        let currencyOnePreviousRate;
        let currencyTwoPreviousRate;

        let currencyOneValues = await this.getCurrencyValues(currencyOne);
        currencyOneRate = currencyOneValues[0];
        currencyOnePreviousRate = currencyOneValues[1];

        let currencyTwoValues = await this.getCurrencyValues(currencyTwo);
        currencyTwoRate = currencyTwoValues[0];
        currencyTwoPreviousRate = currencyTwoValues[1];

        let value = currencyOneRate/currencyTwoRate;
        let previousValue = currencyOnePreviousRate/currencyTwoPreviousRate;
        logger.info(value);
        value= this.round(value);
        previousValue = this.round(previousValue);
        logger.info(previousValue);
        return [value,previousValue];
    }

    /**
     * @description a function to get rates
     * @param {string} currency currency short name
     */
    async getCurrencyValues(currency) {
        return await Currency.findOne({
            'shortName':currency,
        })
        .then( (item) => {
            return [item.currentRate,item.previousRate];
        })
        .catch( (error) => {
            throw new Error('Invalid Currency'); 
        }); 
    }


    /**
     * @description a function to round the number to 4 digit after dot
     * @param {Number} value 
     */
    round(value) {
        return Number((value).toFixed(4));
    }
    
};

