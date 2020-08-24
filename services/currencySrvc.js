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
        Currency.find().select('shortName longName -_id')
        .then( (item) => {
            if (!item) {
                throw new Error();
            }
            callback(res,true,"Found All Items",item);
        }).catch( (err) => {
            callback(res,false,"Could not found items",{'error':'Currencies not found'});
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
            callback(res,true,"Added item",item);
        })
        .catch((err) => {
            callback(res,false,"Could not Add item",{'error':'Currencies not added  '});
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
            let values = await this.getRate(reqBody.fromCurrency,reqBody.toCurrency);
            callback(res,true,"Added item",{
                'value':values[0],
                'previousValue':values[1]
            });
        }catch (err){
            callback(res,false,"Currencies could not be converted",{'error':'Currencies could not be converted'});
        }
    }
    
    /**
    * @description function to get rate
    * @param {object} fromCurrency
    * @param {object} toCurrency
    */
    async getRate(fromCurrency,toCurrency){
        logger.info(fromCurrency,toCurrency);
        let fromCurrencyRate;
        let toCurrencyRate;
        let fromCurrencyPreviousRate;
        let toCurrencyPreviousRate;

        let fromCurrencyValues = await this.getCurrencyValues(fromCurrency);
        fromCurrencyRate = fromCurrencyValues[0];
        fromCurrencyPreviousRate = fromCurrencyValues[1];

        let toCurrencyValues = await this.getCurrencyValues(toCurrency);
        toCurrencyRate = toCurrencyValues[0];
        toCurrencyPreviousRate = toCurrencyValues[1];

        let value = fromCurrencyRate/toCurrencyRate;
        let previousValue = fromCurrencyPreviousRate/toCurrencyPreviousRate;
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

