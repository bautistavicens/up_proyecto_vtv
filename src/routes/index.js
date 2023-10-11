//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();

/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

const branchRouter = require('./branchRouter');
const carRouter = require('./carRouter');

/*---------------------- Routes ----------------------*/
router.use('/branch', branchRouter);

router.use('/car', carRouter);

//router.use('/appointment');

//router.use('/employee');

module.exports = router;