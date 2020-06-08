const common = require('./common');
const utils = require('./utils');
const request = common.request;
const url = common.url;
const RESULT_CODE = common.RESULT_CODE;

var regClientInput = JSON.parse(JSON.stringify(utils.generateRegClientInput()));
var regUserInput = JSON.parse(JSON.stringify(utils.generateRegUserInput()));

var sub = '';
var userDetails = {};


/* 
    * SEQUENCE OF OPERATIONS *
    (1) HEALTH CHECK
    (2) CREATE CLIENT (+owner user)
    (3) FIRST LOGIN
    (4) PASSWORD REQUIRED (Reset Password)
    (5) ADD NEW USER
    (6) REMOVE USER
    (7) GET USER DETAILS
    (8) REMOVE CLIENT
*/

// Health Check
it(`Management micro-service HealthCheck: /v1/client/health_check >> Should [*SUCCESS*]`, done => {
    request(url)
        .get(`/v1/client/health_check`)
        // .set('Authorization', token)
        .send()
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('vault_initialized', true);
            expect(r.body).to.have.a.property('vault_sealed', false);
            expect(r.body).to.have.a.property('blockchain', "alive");
            expect(r.body).to.have.a.property('db', true);
            done();
        }).catch(err => {
            done(err);
        })
})

// Create Client (+Owner User)
// @BODY PARAMS:  companyName, companyId, companyCountryCode, mainAlertEmail, isImmediateAlert, 
//                isActive, isAlerts, username, password, isFinancer, isInsurer, companyURL
it(`REGISTER CLIENT & OWNER USER(POST): /v1/client/register >> Should [*SUCCESS*]`, done => {
    request(url)
        .post(`/v1/client/register`)
        // .set('Authorization', token)
        .send(regClientInput)
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.REG_CLIENT_SUCCESS);
            expect(r.body).to.have.a.property('info');
            expect(r.body).to.have.a.property('asset');
            done();
        }).catch(err => {
            done(err);
        })
})

// FIRST LOGIN
// @BODY PARAMS: username, password
it(`FIRST LOGIN(POST): /v1/client/user/login >> Should [*SUCCESS*]`, done => {
    request(url)
        .post(`/v1/client/user/login`)
        // .set('Authorization', token)
        .send({
            username: regClientInput.username,
            password: regClientInput.password
        })
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.SUCCESS);
            expect(r.body).to.have.a.property('access_token');
            expect(r.body).to.have.a.property('info');
            // Indicates the first login reset password required
            expect(r.body.access_token).to.have.a.property('Session');
            global.session = r.body.access_token.Session;
            done();
        }).catch(err => {
            done(err);
        })
})

// PASSWORD REQUIRED (Reset Password)
// @BODY PARAMS: username, password, session
it(`FIRST LOGIN CHANGE USER PASSWORD REQUIRED(POST): /v1/client/password-required >> Should [*SUCCESS*]`, done => {
    // Change new 'TEST' password
    utils.changePassword(regClientInput);
    request(url)
        .post(`/v1/client/user/login/password-required`)
        .send({
            username: regClientInput.username,
            password: regClientInput.password,
            session: global.session
        })
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.PASSWORD_CHANGE_SUCCESS);
            expect(r.body).to.have.a.property('info');
            expect(r.body).to.have.a.property('asset');
            done();
        }).catch(err => {
            done(err);
        })
})

// LOGIN AGAIN
// @BODY PARAMS: username, password
it(`LOGIN AGAIN(POST): /v1/client/user/login >> Should [*SUCCESS*]`, done => {
    request(url)
        .post(`/v1/client/user/login`)
        // .set('Authorization', token)
        .send({
            username: regClientInput.username,
            password: regClientInput.password
        })
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.SUCCESS);
            expect(r.body).to.have.a.property('access_token');
            expect(r.body).to.have.a.property('info');
            global.token = `Bearer ${r.body.access_token}`;
            done();
        }).catch(err => {
            done(err);
        })
})

// ADD NEW USER
// @BODY PARAMS: client_id, web_cid, username, password, mainAlertEmail, 
//               isActive, isAlerts, isAdmin 
// @AUTH: JWT TOKEN
it(`ADD NEW USER(POST): /v1/client/user >> Should [*SUCCESS*]`, done => {
    request(url)
        .post(`/v1/client/user`)
        .set('Authorization', token)
        .send(regUserInput)
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.REG_USER_SUCCESS);
            expect(r.body).to.have.a.property('info');
            expect(r.body).to.have.a.property('asset');
            expect(r.body.asset.Attributes[0]).to.have.a.property('Value');
            sub = r.body.asset.Attributes[0].Value;
            done();
        }).catch(err => {
            done(err);
        })
})


// REMOVE USER
// @BODY PARAMS: sub 
// @AUTH: JWT TOKEN
it(`DELETE USER(DELETE): /v1/client/user/:sub >> Should [*SUCCESS*]`, done => {
    request(url)
        .delete(`/v1/client/user/${sub}`)
        .set('Authorization', token)
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.REMOVE_USER_SUCCESS);
            expect(r.body).to.have.a.property('info');
            expect(r.body).to.have.a.property('asset');
            done();
        }).catch(err => {
            done(err);
        })
})

// GET USER DETAILS
// @AUTH: JWT TOKEN
it(`GET USER DETAILS(GET): /v1/client/user/details >> Should [*SUCCESS*]`, done => {
    request(url)
        .get(`/v1/client/user/details`)
        .set('Authorization', token)
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.LOAD_USER_DETAILS_SUCCESS);
            expect(r.body).to.have.a.property('info');
            expect(r.body).to.have.a.property('asset');
            expect(r.body.asset).to.have.a.property('user');
            expect(r.body.asset).to.have.a.property('client');
            userDetails = r.body.asset.user;
            done();
        }).catch(err => {
            done(err);
        })
})

// REMOVE CLIENT
// @BODY PARAMS: aws_id, web_cid
// @AUTH: JWT TOKEN
it(`DELETE CLIENT & USER(DELETE): /v1/client/ >> Should [*SUCCESS*]`, done => {
    request(url)
        .delete(`/v1/client/`)
        .set('Authorization', token)
        .send({ 
                web_cid: userDetails.web_cid, 
                aws_id: userDetails.client_id, 
                inviouLogin: "invIOU2019" 
            })
        .then(r => {
            expect(r.body).to.be.an('object');
            expect(r.body).to.have.a.property('code', RESULT_CODE.REMOVE_CLIENT_SUCCESS);
            expect(r.body).to.have.a.property('info');
            expect(r.body).to.have.a.property('asset');
            done();
        }).catch(err => {
            done(err);
        })
})


