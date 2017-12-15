var router = require('express').Router();
var EMPLOYEECLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
  console.log('doing homepage');
  res.render('index');
}

// routes for html controls eg dropdowns, radiobuttons, checkboxes etc
router.get('/api/v3/jobsdropdown', jobsdropdown);

function jobsdropdown(req, res) {
    console.log('getting unique jobs list');
    EMPLOYEECLASS.find().distinct('job').then(function (jobs) {
        console.log(jobs);
        res.json(jobs);
    });
}

// api routes

router.get('/api/v3/read', do_read);
router.post('/api/v3/create', do_create);
router.put('/api/v3/update', do_update);
router.delete('/api/v3/delete/:_id', do_delete);

function do_read(req, res) {
  console.log('doing read');
  EMPLOYEECLASS.find()
    .then(function (results) {
      //console.log(results);
      res.json(results);
    });
}

function do_create(req, res) {
  console.log('creating employee');
  console.log(req.body);

  var data = {
      job: req.body.job,
      gender: req.body.gender,
      name: req.body.name
  }

  var employee = new EMPLOYEECLASS(data);

  employee.save()
    .then(function (result) {
      console.log(result);
      res.json({
        message: 'backend saved!'
      });
    });

}

function do_update(req, res) {
  console.log('updating employee');
  console.log(req.body);

  var update = {
    $set: {
      name: req.body.name,
      gender: req.body.gender,
      job: req.body.job
    }
  }
  EMPLOYEECLASS.findByIdAndUpdate(req.body._id, update)
    .then(function (result) {
      console.log(result);
      res.json({
        message: 'backend updated!'
      });
    });
}

function do_delete(req, res) {
  console.log('deleting employee');
  console.log(req.params);
  EMPLOYEECLASS.findByIdAndRemove(req.params._id).then(function (result) {
      console.log(result);
      res.json({message: 'backend deleted!'});
  });
}