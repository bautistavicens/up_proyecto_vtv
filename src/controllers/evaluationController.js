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
            
            //Tests doesn´t exist
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

    getAllEvaluations: async (req, res) => {
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
            const totalEvaluations= await prisma.evaluation.count();

            //calculate total pages for pagination.
            const totalPages = totalEvaluations > limit ? Math.ceil(totalEvaluations / limit) : 1

            //Search evaluation
            const evaluations = await prisma.evaluation.findMany({
                select:{
                    license_plate: true,
                    test:{
                        select:{
                            description: true
                        }
                    },
                    score: true,
                    date: true,
                    employee:{
                        select:{
                            first_name: true,
                            last_name: true
                        }
                    },
                    branch:{
                        select:{
                            province: true,
                            city: true,
                            address: true,
                        }
                    }
                },
                skip: skip,
                take: limit
            });

            //Tests exists
            if(evaluations != null && evaluations.length > 0){
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    totalPages: totalPages,
                    data: evaluations,

                });
            }
            
            //Evaluations doesn´t exist
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

    postEvaluation: async (req,res) => {
        try{
            //create data
            const evaluation = await prisma.evaluation.create({
                data:{
                    license_plate: req.body.licensePlate,
                    test_id: parseInt(req.body.testId),
                    score: parseInt(req.body.score),
                    date: req.body.date ? new Date(req.body.date) : new Date(),
                    //Change later
                    employee_id: 1,
                    branch_id: parseInt(req.body.branchId)
                }
            });

            //Evaluation created succesfully
            if(evaluation != null){
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: evaluation,

                });
            }
                
            //Evaluation could´t be created
            return res.status(409).json({
                msg: "Conflict",
                status: 409,
                msgError: "No se ha podido añadir la evaluación"
            });
        }
        catch(error){
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    },

    editEvaluationScore: async (req, res) => {
        try{
            const evaluation = await prisma.evaluation.update({
                where:{
                    license_plate_test_id:{
                        license_plate: req.params.licenseplate,
                        test_id: parseInt(req.params.testid)
                    }
                },
                data: {
                    score: parseInt(req.body.score)
                }
            });

            //Evaluation edited succesfully
            if(evaluation != null){
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: evaluation,

                });
            }
                
            //Evaluation could´t be edited
            return res.status(404).json({
                msg: "Not Found",
                status: 404,
                msgError: "No se ha encontrado la evaluación"
            });
        }
        catch(error){
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        } 
    },

    deleteEvaluation: async (req, res) => {
        try{
            //create data
            const evaluation = await prisma.evaluation.delete({
                where:{
                    license_plate_test_id:{
                        license_plate: req.params.licenseplate,
                        test_id: parseInt(req.params.testid)
                    }
                }
            });

            //Evaluation deleted succesfully
            if(evaluation != null){
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: evaluation,

                });
            }
                
            //Evaluation could´t be deleted
            return res.status(404).json({
                msg: "Not Found",
                status: 404,
                msgError: "No se ha encontrado la evaluación"
            });
        }
        catch(error){
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }   
    }

}

module.exports = evaluationController;