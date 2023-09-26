//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();

/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

const carRouter = require('./carRouter');

/*---------------------- Routes ----------------------*/
router.use('/car', carRouter);

//router.use('/appointment');

//router.use('/branch');

//router.use('/employee');

module.exports = router;