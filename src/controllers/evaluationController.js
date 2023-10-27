const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const commonErrorsHandling = require('../utils/commonErrorsHandling.js');

const evaluationController = {
    getTests: async (req, res) => {
        try{
            //Search tests
            const tests = await prisma.test.findMany();

            //Tests exists
            if(tests != null && tests.length > 0){
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: tests,

                });
            }
            
            //Vehicle doesn´t exist
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

}

module.exports = evaluationController;