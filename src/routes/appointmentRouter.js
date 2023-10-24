//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/


/************************* Controller ****************************/
const appointmentController = require('../controllers/appointmentController.js');
/*****************************************************************/


//Get all appointments 
//router.get('/',);

//Get all appointment possible status
router.get('/status', appointmentController.getAllAppointmentPossibleStatus);

//Get all free appointments
//router.get('/available',);

//Get all free appointments from branch
//router.get('/available/:branch',);

//Get all free appointments from a branch on specific date
//router.get('/available/:branch/:date',);

//Get all appointments from specific date
//router.get('/:date');

//add an available appointment to branch
//router.post('/');

//take an available appointment
router.post('/:id', appointmentController.bookAnAppointment);

//cancell an appointment
router.put('/:id/cancel', appointmentController.cancelAnAppointment);

//delete an appointment
router.delete('/:id', appointmentController.deleteAnAppointment);

module.exports= router;