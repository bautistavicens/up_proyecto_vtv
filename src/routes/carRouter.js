//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/


/************************* Controller ****************************/
const vehicleController = require('../controllers/vehicleController.js');
/*****************************************************************/


//List all vehicles
router.get('/', vehicleController.getAllVehicles);

//get vehicle by licenseplate
router.get('/:licenseplate',vehicleController.getVehicleByLicensePlate);


//get appointment data from a specific car
router.get('/:licenseplate/appointment', vehicleController.getCarAppointment);

//get all evaluations from a car
//router.get('/:licenceplate/evaluation');

//get evaluations of an specific test from a car
//router.get('/:licenceplate/evaluation/:testId');


//router.post('/',);

//router.put('/',);

//Delete all evaluations from a car
//router.delete('/:licenceplate',);

//Delete a specific evaluation from a car
//router.delete('/:licenceplate/:testId',);

module.exports = router;