const chai = require('chai');
const chaiHttp = require('chai-http');
const {assert} = require('chai');
const app = require('./../../server');
const { response } = require('./../../server');

chai.use(chaiHttp);

let result;

describe('Currency Converter Test', () => {
    describe('Repository Currency Test', () => {
        it('GET /currency returns all Currency', (done) => {
            chai.request(app)
            .get('/currency')
            .end( ( err , response ) => {
                result = response.body;
                assert.equal(result.length,10);
                done();
            } );
        });
        
        /*
        it('POST /currency returns all Currency', (done) => {
            chai.request(app)
            .post('/currency')
            .send({
                'shortName':'SGD',
                'longName':'Singapore Doller',
            })
            .end( ( err , response ) => {
                result = response.body;
                assert.equal(result.shortName,'GBP');
                done();
            } );
        });
        */
    });
    
    describe('Conversion Currency Test', () => {
        
        it('POST /currency/convert returns converted currency', (done) => {
            chai.request(app)
            .post('/currency/convert')
            .send({
                'currencyOne':'USD',
                'currencyTwo':'INR',
            })
            .end( ( err , response ) => {
                result = response.body;
                console.log(result);
                assert.equal(result.value,74.5809);
                done();
            } );
        });

        it('POST /currency/convert returns Eur to GBP', (done) => {
            chai.request(app)
            .post('/currency/convert')
            .send({
                'currencyOne':'EUR',
                'currencyTwo':'GBP',
            })
            .end( ( err , response ) => {
                result = response.body;
                console.log(result);
                assert.equal(result.value,0.9018);
                done();
            } );
        });

        it('POST /currency/convert returns Eur to GBP', (done) => {
            chai.request(app)
            .post('/currency/convert')
            .send({
                'currencyOne':'AUD',
                'currencyTwo':'CAD',
            })
            .end( ( err , response ) => {
                result = response.body;
                console.log(result);
                assert.equal(result.value,0.9554);
                done();
            } );
        });

        it('POST /currency/convert returns Eur to GBP', (done) => {
            chai.request(app)
            .post('/currency/convert')
            .send({
                'currencyOne':'SGD',
                'currencyTwo':'CNY',
            })
            .end( ( err , response ) => {
                result = response.body;
                console.log(result);
                assert.equal(result.value,5.0654);
                done();
            } );
        });

        it('POST /currency/convert returns Eur to GBP', (done) => {
            chai.request(app)
            .post('/currency/convert')
            .send({
                'currencyOne':'KRW',
                'currencyTwo':'JPY',
            })
            .end( ( err , response ) => {
                result = response.body;
                console.log(result);
                assert.equal(result.value,0.0894);
                done();
            } );
        });
    } );
});