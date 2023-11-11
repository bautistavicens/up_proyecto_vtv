//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();

//jwtAuthVerify
const jwtAuthVerify = require('../middlewares/jwtAuthVerify.js');
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

/************************* Controller ****************************/
const employeeController = require('../controllers/employeeController.js');
/*****************************************************************/

//Get all employees
router.get('/', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, employeeController.listAllEmployees);

//Get one employee by id
router.get('/:id', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, employeeController.getEmployeeById);


//Register new user
router.post('/register', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, employeeController.register);

//user log in
router.post('/login', employeeController.login);

router.put('/:id', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, employeeController.editEmployee);

//delete one user
router.delete('/:id', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, employeeController.deleteEmployee);

module.exports = router;