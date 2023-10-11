const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

//const jwtHelper = require('../../helpers/jwtHelper.js');
//const generateRandomString = require('../../helpers/generateRandomString.js');
const commonErrorsHandling = require('../utils/commonErrorsHandling.js');

const branchController = {

    listAllBranches: async (req, res) => {
        try{
            //Get "page" and "limit" parameters from URL query
            let {page} = req.query;

            //if 'page' doesn't exist set 1
            if(!page){
                page = 1;
            }

            //For jumping
            const skip = (page - 1) * 6;

            //max limit to send
            const limit = 6;

            //count total amount of products in DB 
            const totalBranches= await prisma.branch.count();

            //calculate total pages for pagination.
            const totalPages = totalBranches > limit ? Math.ceil(totalBranches / limit) : 1

            const branches = await prisma.branch.findMany({
                select: {
                    branch_id: true,
                    province: true,
                    city: true,
                    zip_code: true,
                    address: true,
                    area_number: true,
                    phone_number: true,
                    email: true,
                },
                orderBy:{
                    province: 'asc'
                },
                skip: skip,
                take: limit
            });

            //Branches exists
            if(branches  != null && branches.length > 0){
                //Send data
                return res.status(200).json({
                    msg: "OK",
                    status: 200,
                    totalPages: totalPages,
                    data: branches 
                });
            }

            //Branches doesn´t exist
            return res.status(404).json({
                msg: "Not Found",
                status: 404
            });
        }
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    },
    searchBranchById: async (req, res) => {
        try{
            //Get branch id from params
            const branchId = parseInt(req.params.id);

            const branch = await prisma.branch.findUnique({
                where:{
                    branch_id: branchId
                },
                select: {
                    branch_id: true,
                    province: true,
                    city: true,
                    zip_code: true,
                    address: true,
                    area_number: true,
                    phone_number: true,
                    email: true,
                }
            })

            //branch exists
            if(branch  != null){
                //Send data
                return res.json({
                    msg: "OK",
                    status: 200,
                    data: branch
                });
            }

            //branch doesn´t exist
            return res.json({
                msg: "Not Found",
                status: 404
            });
        }
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    }
}

module.exports = branchController;