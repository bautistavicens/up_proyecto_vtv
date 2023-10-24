//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();

/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

const branchRouter = require('./branchRouter');
const carRouter = require('./carRouter');
const appointmentRouter = require('./appointmentRouter');

/*---------------------- Routes ----------------------*/
router.use('/branch', branchRouter);

router.use('/vehicle', carRouter);

router.use('/appointment', appointmentRouter);

//router.use('/employee');

module.exports = router;