//@Author: Bautista

/*++++++++++++++ Requires ++++++++++++++*/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

/*-----------------Middleware -----------------*/
function verify(req, res, next) {
    try{
        //get token from header
        const accessToken = req.headers['authorization'];

        //get token from the strcuture -> "Bareer Token"
        const token = accessToken && accessToken.split(' ')[1];

        //token don´t exists
        if(token == undefined){
            return res.json({
                msg: 'Unauthorized',
                status: 401
            });
        }

        //token exists
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        //retrive token data and store in req
        req.employee = decoded.payload;

        //continue
        next();

    }
    catch(error){
        //jwt: invalid signature
        if(error.code === undefined){
            return res.status(406).json({
                msg: 'Not Acceptable Token',
                status: 406
            });
        }
    }
};

async function isAdmin(req, res, next) {
    try{
        //Get admin category
        const employeeAdminCategory = await prisma.employee_category.findUnique({
            where:{
                name: process.env.EMPLOYEE_ADMINISTRADOR_CATEGORY_NAME
            }
        });

        //user is not admin
        if(req.employee.employee_category.category_id != employeeAdminCategory.category_id){
            return res.status(403).json({
                msg: "Forbidden",
                status: 403
            });
            
        }
    //continue (is admin)
        next();
    }
    catch(error){
        console.log(error);
    }
};


module.exports.verify = verify;
module.exports.isAdmin = isAdmin;