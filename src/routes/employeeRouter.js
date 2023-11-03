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

//Get employee by first_name and last_name
//router.get('/:firstname/:lastname',);

//Register new user
router.post('/register', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, employeeController.register);

//user log in
router.post('/login', employeeController.login);

//edit one user data
//router.put('/:id', );

//delete one user
router.delete('/:id', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, employeeController.deleteEmployee);

module.exports = router;