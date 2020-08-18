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
                console.log(result);
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
} );