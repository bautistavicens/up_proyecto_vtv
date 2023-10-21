//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/


/************************* Controller ****************************/
const appointmentController = require('../controllers/contactApiController.js');
/*****************************************************************/


//Get all appointments 
//router.get('/',);

//Get all appointment possible status
//router.get('/status',);

//Get all free appointments
//router.get('/available',);

//Get all free appointments from branch
//router.get('/available/:branch',);

//Get all free appointments from a branch on specific date
//router.get('/available/:branch/:date',);

//Get all appointments from specific date
//router.get('/:date');

//add an available appointment to branch
//router.post('/:branch');