const chai = require("chai")
const chaiHttp = require("chai-http");
const request = require('supertest');
const RESULT_CODE = require('../../server/constants/enums').RESULT_CODE;
// const utils = require('./utils');
// const url = 'https://staging-api.inviou.com';
// const A_clientId = '1hrjd6ae3ke6ir3lb3tpgcmurn';
// const A_clientSecret = '1iheqva6eraladd4jjsiqte1tq4jv2q18caoratb5uhijatjeinl'
// let A_clientId = '5d3gkodnub80f8mln03omqk98';
// let A_clientSecret = 'a2hsseevq1vrmcajraad4r4qpfbhi1f0viu5oehqdv33ucoa41c';
const url = 'http://localhost:3800';

const expect = chai.expect;
const description = {
    test1: "Register & Remove Client, Register & Remove User",
    test2: "Forgot Password Flow",
    test3: "Owner User Permissions and Operations",
    test4: "Admin User Permissions and Operations",
    test5: "Regular User Permissions and Operations",
    test6: "Incorrect Input Checks"
};

chai.should();
chai.use(require('chai-things'));
chai.use(require('chai-arrays'));
chai.use(require('chai-each'));
chai.use(chaiHttp);

global.chai = chai;
global.expect = expect;

exports.request = request;
// exports.A_clientId = A_clientId;
// exports.A_clientSecret = A_clientSecret;
exports.url = url;
exports.RESULT_CODE = RESULT_CODE;
exports.description = description;
