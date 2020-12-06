const chai = require('chai');
const chaiHTTP = require('chai-http');

const register = require("../../../routes/register");
const db = require('../../../helper/db');
const { response } = require('../../../app');
const sinon = require("sinon");

//ASSERTION///
chai.should();
chai.use(chaiHTTP);

const expect = chai.expect();


//*****TEST POST METHOD */
describe('POST /register', () => {
it('It should send an email and return token, tested by spy', (done) => {
    var spy = sinon.spy();
    var getCallback = sinon.stub();
    const task = {
        email:"nidanur@sabanciuniv.edu", // email should be valid since mail will be send, therefore email is set like that
        password:"TestRegister",
        gender:"kadın"
    };

    chai.request(register).post("/")
    .send(task)
    .end( (err,res) => {
        
        //response.should.have.status(200);
        // response.body.should.be('json');//////?????
        res.body.should.have.property('token');
        //response.body.should.have.property('message');
        //expect(response.body.message).to.equal('Email has been send');
        done();
    })
})
    
})