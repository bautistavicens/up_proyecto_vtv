//@Author: Bautista
/*++++++++++++++++++++ Requieres ++++++++++++++++++++*/

//Express
const express = require("express");

//Router
const router = express.Router();

//Controller
const branchController = require('../controllers/branchController.js');
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

//List all branches
router.get('/', branchController.listAllBranches);

//get branch by id
router.get('/:id', branchController.searchBranchById); 

//get available appointments from specific branch
//router.get('/:id/appointment/available,');

module.exports= router;