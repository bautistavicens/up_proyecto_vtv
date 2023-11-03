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
const vehicleController = require('../controllers/vehicleController.js');
/*****************************************************************/


//List all vehicles
router.get('/', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, vehicleController.getAllVehicles);

//get vehicle by licenseplate
router.get('/:licenseplate',vehicleController.getVehicleByLicensePlate);


//get appointment data from a specific car
router.get('/:licenseplate/appointment', vehicleController.getVehicleAppointment);

//get all evaluations from a car
router.get('/:licenceplate/evaluation', jwtAuthVerify.verify, vehicleController.getVehicleEvaluations);

//get evaluations of an specific test from a car
router.get('/:licenseplate/evaluation/:testid', jwtAuthVerify.verify, vehicleController.getOneVehicleEvaluation);


//router.post('/',);

router.put('/:licenseplate/appointment/cancel', jwtAuthVerify.verify, vehicleController.cancelCarAppointment);

//Delete all evaluations from a car
router.delete('/:licenseplate', jwtAuthVerify.verify, vehicleController.deleteVehicle);

//Delete a specific evaluation from a car
//router.delete('/:licenceplate/:testId',);

module.exports = router;