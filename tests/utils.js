var utils = require('../../server/common/utils');

// [*] Test functions [*]


const deleteMainAlertEmail = (obj) => {
    delete obj.mainAlertEmail;
}

const deleteUsername = (obj) => {
    delete obj.username;
}

const deletePassword = (obj) => {
    delete obj.password;
}

const deleteIsAdmin = (obj) => {
    delete obj.isAdmin;
}

const deleteIsAlerts = (obj) => {
    delete obj.isAlerts;
}

const deleteIsActive = (obj) => {
    delete obj.isActive;
}

const deleteCompanyName = (obj) => {
    delete obj.companyName;
}

const deleteCompanyId = (obj) => {
    delete obj.companyId;
}

const deleteCompanyCountryCode = (obj) => {
    delete obj.companyCountrycode;
}

const deleteIsImmediateAlert = (obj) => {
    delete obj.isImmediateAlert;
}

const deleteInsurerAndFinancer = (obj) => {
    delete obj.isInsurer;
    delete obj.isFinancer;
}

const changeMainAlertEmail = (obj, value) => {
    if (value) {
        obj.mainAlertEmail = value;
    }
    else {
        obj.mainAlertEmail = `TEST_${generateRandomString(8)}@gmail.com`;
    }
}

const changeUsername = (obj, value) => {
    if (value) {
        obj.username = value;
    }
    else {
        obj.username = `TEST_${generateRandomString(8)}`;
    }
}

const changePassword = (obj, value) => {
    if (value) {
        obj.password = value;
    }
    else {
        obj.password = `TEST_${generateRandomString(8)}`;
    }
}

const changeIsAdmin = (obj, value) => {
    if (value) {
        obj.isAdmin = utils.boolNormalize(value);
    }
    else {
        obj.isAdmin = !obj.isAdmin;
    }
}

const changeCompanyURL = (obj, value) => {
    if (value) {
        obj.companyURL = utils.boolNormalize(value);
    }
    else {
        obj.companyURL = `https://TEST_${generateRandomString(8)}.com/`;
    }
}

const changeIsAlerts = (obj, value) => {
    if (value) {
        obj.isAlerts = utils.boolNormalize(value);
    }
    else {
        obj.isAlerts = !obj.isAlerts;
    }
}

const changeIsFinancer = (obj, value) => {
    if (value) {
        obj.isFinancer = utils.boolNormalize(value);
    }
    else {
        obj.isFinancer = !obj.isFinancer;
    }
}

const changeIsInsurer = (obj, value) => {
    if (value) {
        obj.isInsurer = utils.boolNormalize(value);
    }
    else {
        obj.isInsurer = !obj.isInsurer;
    }
}

const changeIsActive = (obj, value) => {
    if (value) {
        obj.isActive = utils.boolNormalize(value);
    }
    else {
        obj.isActive = !obj.isActive;
    }
}

const changeCompanyName = (obj, value) => {
    if (value) {
        obj.companyName = value;
    }
    else {
        obj.companyName = `TEST_${generateRandomString(8)}`;
    }
}

const changeCompanyId = (obj, value) => {
    if (value) {
        obj.companyId = value;
    }
    else {
        obj.companyId = `TEST_${generateRandomString(8)}`;
    }
}

const changeCompanyCountryCode = (obj, value) => {
    if (value) {
        obj.companyCountrycode = value;
    }
    else {
        obj.companyCountrycode = 'GB'
    }
}

const changeIsImmediateAlert = (obj, value) => {
    if (value) {
        obj.isImmediateAlert = utils.boolNormalize(value);
    }
    else {
        obj.isImmediateAlert = !obj.isImmediateAlert;
    }
}

const changeInsurerAndFinancer = (obj, insurarValue, financerValue) => {
    if (insurarValue) {
        obj.isInsurer = utils.boolNormalize(insurarValue);
    }
    else {
        obj.isInsurer = !obj.isInsurer;
    }
    if (financerValue) {
        obj.isFinancer = utils.boolNormalize(financerValue);
    }
    else {
        obj.isFinancer = !obj.isFinancer;
    }
}

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//  User generateRegUserInput function
const generateRegClientInput = () => {
    let registerClientInput = JSON.parse(JSON.stringify(require('../checks/materials/registerClient.json')));
    registerClientInput.mainAlertEmail = `TEST_${generateRandomString(8)}@gmail.com`;
    registerClientInput.username = `TEST_${generateRandomString(8)}`;
    registerClientInput.password = `TEST_${generateRandomString(8)}`;
    registerClientInput.companyName = `TEST_${generateRandomString(8)}`;
    registerClientInput.companyId = `TEST_${generateRandomString(8)}`;
    registerClientInput.companyURL = `https://TEST_${generateRandomString(8)}.com/`;
    /*
	"companyURL": "https://TEST_COMPANY_NAME323.com/",
	"isImmediateAlert": 1,
	"isActive": 1,
	"inactiveDate": 1,
	"isAlerts": 1, 
	"isFinancer": 1,
	"isInsurer": 1
    */
    return registerClientInput;
}

const generateRegUserInput = () => {
    let registerUserInput = JSON.parse(JSON.stringify(require('../checks/materials/registerUser.json')));
    registerUserInput.mainAlertEmail = `TEST_${generateRandomString(8)}@gmail.com`;
    registerUserInput.username = `TEST_${generateRandomString(8)}`;
    registerUserInput.password = `TEST_${generateRandomString(8)}`;
    /*
	"isAdmin": 1,
	"isActive": 1,
	"isAlerts": 1
    */
    return registerUserInput;
}

exports.generateRegClientInput = generateRegClientInput;
exports.generateRegUserInput = generateRegUserInput;

exports.changeMainAlertEmail = changeMainAlertEmail;
exports.changeUsername = changeUsername;
exports.changePassword = changePassword;
exports.changeIsAdmin = changeIsAdmin;
exports.changeIsAlerts = changeIsAlerts;
exports.changeIsActive = changeIsActive;
exports.changeCompanyURL = changeCompanyURL;
exports.changeCompanyName = changeCompanyName;
exports.changeCompanyId = changeCompanyId;
exports.changeCompanyCountryCode = changeCompanyCountryCode;
exports.changeIsImmediateAlert = changeIsImmediateAlert;
exports.changeInsurerAndFinancer = changeInsurerAndFinancer;
exports.changeIsFinancer = changeIsFinancer;
exports.changeIsInsurer = changeIsInsurer;

exports.deleteMainAlertEmail = deleteMainAlertEmail;
exports.deleteUsername = deleteUsername;
exports.deletePassword = deletePassword;
exports.deleteIsAdmin = deleteIsAdmin;
exports.deleteIsAlerts = deleteIsAlerts;
exports.deleteIsActive = deleteIsActive;
exports.deleteCompanyName = deleteCompanyName;
exports.deleteCompanyId = deleteCompanyId;
exports.deleteCompanyCountryCode = deleteCompanyCountryCode;
exports.deleteIsImmediateAlert = deleteIsImmediateAlert;
exports.deleteInsurerAndFinancer = deleteInsurerAndFinancer;
