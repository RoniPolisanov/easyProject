var mongoose = require('mongoose');

var NFA_Schema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    owner: {type: String, default: null},
    createdDate: {type: Date, default: null},
    demoArray: [{type: mongoose.Schema.Types.ObjectId, ref: "OtherSchemaRef", default: null}]
});

module.exports = mongoose.model("NFA_Schema", NFA_Schema, "NFAs");