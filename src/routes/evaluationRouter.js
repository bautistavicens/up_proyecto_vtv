//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

/************************* Controller ****************************/
const evaluationController = require('../controllers/evaluationController.js');
/*****************************************************************/

//Get all evaluations
//router.get('/',);

//Get all test of an evaluation
router.get('/test', evaluationController.getTests);

//Get all free appointments from branch
//router.get('/available/:branch',);

//Get all free appointments from a branch on specific date
//router.get('/available/:branch/:date',);

//Get all appointments from specific date
//router.get('/:date',);



//add an available appointment to branch
//router.post('/:branch')

module.exports = router;