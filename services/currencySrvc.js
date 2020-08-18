// importing db schema
const Currency = require('../model/currencyModel');


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

};

