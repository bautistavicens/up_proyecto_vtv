//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

//List all cars
router.get('/', (req, res) => {
    res.json("Getting all cars...");
});

//get car by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    res.json("Getting cars #"+ id);
});



//router.post('/',);

//router.put('/',);

//router.delete('/',);

module.exports = router;