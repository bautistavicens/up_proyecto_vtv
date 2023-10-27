//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();

/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

const branchRouter = require('./branchRouter');
const vehicleRouter = require('./vehicleRouter');
const appointmentRouter = require('./appointmentRouter');
const evaluationRouter = require('./evaluationRouter');


/*---------------------- Routes ----------------------*/
router.use('/branch', branchRouter);

router.use('/vehicle', vehicleRouter);

router.use('/appointment', appointmentRouter);

router.use('/evaluation', evaluationRouter);

//router.use('/employee');

module.exports = router;