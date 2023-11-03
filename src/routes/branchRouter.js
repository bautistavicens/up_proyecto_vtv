//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();

//jwtAuthVerify
const jwtAuthVerify = require('../middlewares/jwtAuthVerify.js');

/************************* Controller ****************************/
const branchController = require('../controllers/branchController.js');
/*****************************************************************/

//List all branches
router.get('/', branchController.listAllBranches);

//get branch by id
router.get('/:id', branchController.searchBranchById); 

//get appointments from specific branch
router.get('/:id/appointment', jwtAuthVerify.verify, branchController.getAllAppointments);

//get available appointments from specific branch
router.get('/:id/appointment/available/', branchController.getAvailableAppointments);

//get available appointments from specific branch on specific date
router.get('/:id/appointment/available/:date', branchController.getAvailableAppointmentsOnDate);

//get available appointments from specific branch
router.get('/:id/appointment/:date', jwtAuthVerify.verify, branchController.getAllAppointmentsOnSpecificDate);

module.exports= router;