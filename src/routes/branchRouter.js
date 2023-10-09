//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

//List all branches
router.get('/', (req, res) => {
    res.json("Getting all branch...");
});

//get branch by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    res.json("Getting cars #"+ id);
});

//get available appointments from specific branch
router.get('/:id/appointment/available,');

module.exports= router;