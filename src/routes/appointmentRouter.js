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
const appointmentController = require('../controllers/appointmentController.js');
/*****************************************************************/


//Get all appointment possible status
router.get('/status', jwtAuthVerify.verify, appointmentController.getAllAppointmentPossibleStatus);


//add an available appointment to branch
router.post('/', jwtAuthVerify.verify, appointmentController.createAvailableAppointmentOnDate);

//take an available appointment
router.post('/:id', appointmentController.bookAnAppointment);

//cancel an appointment
router.put('/:id/cancel', jwtAuthVerify.verify, appointmentController.cancelAnAppointment);

//delete an appointment
router.delete('/:id', jwtAuthVerify.verify, appointmentController.deleteAnAppointment);

module.exports= router;