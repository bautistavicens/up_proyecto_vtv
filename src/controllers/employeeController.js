const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const jwtHelper = require('../helpers/jwtHelper.js');
//const generateRandomString = require('../../helpers/generateRandomString.js');
const commonErrorsHandling = require('../utils/commonErrorsHandling.js');

const employeeController = {

    listAllEmployees: async (req, res) => {
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
            const totalEmployees= await prisma.employee.count();

            //calculate total pages for pagination.
            const totalPages = totalEmployees > limit ? Math.ceil(totalEmployees / limit) : 1

            const employees = await prisma.employee.findMany({
                select: {
                 employee_id: true,
                 first_name: true,
                 last_name: true,
                 email: true,
                 last_login: true,
                 employee_category:{
                    select:{
                        name: true
                    }
                 }   
                },
                orderBy:{
                    last_name: 'asc'
                },
                skip: skip,
                take: limit
            });

            //employees exists
            if(employees != null && employees.length > 0){
                //Send data
                return res.status(200).json({
                    msg: "OK",
                    status: 200,
                    totalPages: totalPages,
                    data: employees 
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

    getEmployeeById: async (req, res) => {
        try{

            const employee = await prisma.employee.findUnique({
                where:{
                    employee_id: parseInt(req.params.id)
                },
                select: {
                 employee_id: true,
                 first_name: true,
                 last_name: true,
                 email: true,
                 last_login: true,
                 employee_category:{
                    select:{
                        name: true
                    }
                 }   
                }
            });

            //employee exists
            if(employee != null){
                //Send data
                return res.status(200).json({
                    msg: "OK",
                    status: 200,
                    data: employee
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

    register: async(req, res) => {
        try{
            
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            
            const employee = await prisma.employee.create({
                data:{
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, saltRounds),
                    category_id: parseInt(req.body.categoryId)
                }
            });

            //Employee exists
            if(employee != null){

                //delete password property before sending
                delete employee.password;

                //delete last_login property before sending
                delete employee.last_login;

                //Send data
                return res.status(201).json({
                    msg: "Created",
                    status: 201,
                    data: employee
                });
            }

            //Employee couldn't be created
            return res.status(409).json({
                msg: "Conflict",
                status: 409
            });
        }
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    },

    login: async(req, res) => {
        try{
            const employee = await prisma.employee.findUnique({
                where:{
                    email: req.body.email
                },
                select:{
                    email: true,
                    password: true,
                    employee_category:{
                        select:{
                            category_id: true,
                            name: true
                        }
                    }
                }
            });

            //Employee exists
            if(employee != null){

                //Passowrd is correct
                if(bcrypt.compareSync(req.body.password.trim(), employee.password)) {
                    
                    //alter last login data
                    prisma.employee.update({
                        where: {
                            email: employee.email
                        },
                        data:{
                            last_login: Date.now()
                        }
                    });

                    delete employee.password

                    //generate JWT Token Auth.
                    const accessToken = jwtHelper.signToken(employee);

                    //send Token and status
                    return res.header('authorization', accessToken).json({
                        msg: 'OK',
                        status: 200,
                        token: accessToken,
                        employeeCategory: employee.employee_category.name,
                    });
                }

                //incorrect password
                return res.status(406).json({
                    msg: 'Not Acceptable',
                    status: 406, 
                }); 
            }

            //Employee not found
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

    deleteEmployee: async (req, res) => {
        try{

            const employee = await prisma.employee.delete({
                where:{
                    employee_id: parseInt(req.params.id)
                },
            });

            //employee exists
            if(employee != null){
                //delete password property before sending
                delete employee.password;

                //Send data
                return res.status(200).json({
                    msg: "OK",
                    status: 200,
                    data: employee
                });
            }

            //Branches doesn´t exist
            return res.status(404).json({
                msg: "Not Found",
                status: 404
            });
        }
        catch(error){
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    }, 
}

module.exports = employeeController;