var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = "mongodb://localhost:27500/people";
mongoose.connect(url, {useMongoClient: true});

var doc = {
    name: String,
    gender: String,
    job: String
}

var document_structure = new mongoose.Schema(doc);

var EMPLOYEECLASS = mongoose.model('employees', document_structure);

module.exports = EMPLOYEECLASS;
