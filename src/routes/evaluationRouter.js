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
const evaluationController = require('../controllers/evaluationController.js');
/*****************************************************************/

//Get all evaluations
router.get('/', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, evaluationController.getAllEvaluations);

//Get all test of an evaluation
router.get('/test', jwtAuthVerify.verify, jwtAuthVerify.isAdmin, evaluationController.getTests);

//Get all evaluations from specific date
router.get('/:date',);

//upload evaluation
router.post('/', evaluationController.postEvaluation);

//edit evaluation score of a car
router.put('/:licenseplate/:testid', evaluationController.editEvaluationScore);

//delete one evaluation of a car
router.delete('/:licenseplate/:testid', evaluationController.deleteEvaluation);

module.exports = router;