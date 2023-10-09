//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

//List all cars
router.get('/', (req, res) => {
    res.json("Getting all cars from all branches...");
});

//get car by licenseplate
router.get('/:licenceplate', (req, res) => {
    const licenceplate = req.params.licenceplate
    res.json("Getting car with licenceplate"+ licenceplate);
});


//get appointment date data from a specific car
router.get('/:licenceplate/appointment');

//get all evaluations from a car
router.get('/:licenceplate/evaluation');

//get evaluations of an specific test from a car
router.get('/:licenceplate/evaluation/:testId');


//router.post('/',);

//router.put('/',);

//Delete all evaluations from a car
router.delete('/:licenceplate',);

//Delete a specific evaluation from a car
router.delete('/:licenceplate/:testId',);

module.exports = router;