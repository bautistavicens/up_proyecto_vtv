const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const commonErrorsHandling = require('../utils/commonErrorsHandling.js');

const vehicleController = {

    getAllVehicles: async (req, res) => {
        try{
            //Get "page" and "limit" parameters from URL query
            let {page} = req.query;

            //if 'page' doesn't exist set 1
            if(!page){
                page = 1;
            }

            //For jumping
            const skip = (page - 1) * 9;

            //max limit to send
            const limit = 9;

            //count total amount of products in DB 
            const totalVehicles= await prisma.vehicle.count();

            //calculate total pages for pagination.
            const totalPages = totalVehicles > limit ? Math.ceil(totalVehicles / limit) : 1
            
            //Search vehicles
            const vehicles = await prisma.vehicle.findMany({
                select:{
                    license_plate: true,
                    owner_dni: true,
                    owner_first_name: true,
                    owner_last_name: true,
                    origin:{
                        select:{
                            description: true
                        }
                    }
                },
                skip: skip,
                take: limit
            });

            //Vehicles exists
            if(vehicles != null && vehicles.length > 0){
    
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    totalPages: totalPages,
                    data: vehicles,
    
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

    getVehicleByLicensePlate: async (req, res) => {
        try{
            //Search vehicle
            const vehicle = await prisma.vehicle.findUnique({
                where:{
                    license_plate: req.params.licenseplate
                },
                select:{
                    license_plate: true,
                    owner_dni: true,
                    owner_first_name: true,
                    owner_last_name: true,
                    origin:{
                        select:{
                            description: true
                        }
                    }
                }
            });

            //Vehicle exists
            if(vehicle  != null){
                    
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: vehicle,
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

    getVehicleAppointment: async (req, res) => {
        try{
            //Search appointment
            const appointment = await prisma.vehicle.findUnique({
                where:{
                    license_plate: req.params.licenseplate
                },
                select:{
                    appointment:{
                        select:{
                            appointment_id: true,
                            date: true,
                            status:{
                                select:{
                                    description: true
                                }
                            },
                            branch:{
                                select:{
                                    province: true,
                                    city: true,
                                    address: true
                                }
                            }
                        }       
                    }  
                }
            });
            
            //Car's appointment exists
            if(appointment  != null){
        
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: appointment,
                });
            }

            //Car's appointment doesn´t exist
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

    getVehicleEvaluations: async (req, res) => {
        try{
            //Get car evaluations
            const evaluations = await prisma.evaluation.findMany({
                where:{
                    license_plate: req.params.licenseplate
                },
                select:{
                    license_plate: true,
                    test:{
                        select:{
                            test_id: true,
                            description: true
                        }
                    },
                    score: true,
                    date: true,
                    branch:{
                        select:{
                            province: true,
                            city: true,
                            address: true
                        }
                    }
                }       
            });
            
            //car evaluations exists
            if(evaluations != null && evaluations.length > 0){
    
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: evaluations,
    
                });
            }

            //Car evaluation doesn´t exist
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

    getOneVehicleEvaluation: async (req, res) => {
        try{
            //Get car evaluations
            const evaluation = await prisma.evaluation.findUnique({
                where:{
                    license_plate_test_id:{
                        license_plate: req.params.licenseplate,
                        test_id: parseInt(req.params.testid)
                    }
                },
                select:{
                    license_plate: true,
                    test:{
                        select:{
                            description: true
                        }
                    },
                    score: true,
                    date: true,
                    branch:{
                        select:{
                            province: true,
                            city: true,
                            address: true
                        }
                    }
                }       
            });
            
            //car evaluations exists
            if(evaluation != null){
    
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: evaluation,
    
                });
            }

            //Car evaluation doesn´t exist
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

    cancelCarAppointment: async (req, res) => {
        try{
            //Get free status value to contrast with db data.
            const freeStatus = process.env.APPOINTMENT_STATUS_LIBRE;
            
            //Get vehicle appointmentid
            const vehicleAppointment = await prisma.vehicle.findUnique({
                where:{
                    license_plate: req.params.licenseplate,
                    AND:[
                        {owner_dni: req.body.ownerDNI}
                    ]
                },
                select:{
                    appointment_id: true
                }
            });

            //Appointment exists
            if(vehicleAppointment != null){

                //Get appointment status id to book appointment
                const status = await prisma.status.findUnique({
                    where:{
                        description: freeStatus
                    },
                    select:{
                        status_id: true
                    }
                });

                const deletedVehicle = await prisma.vehicle.delete({
                    where:{
                        license_plate: req.params.licenseplate
                    }
                });

                const verifyVehicleDelete = deletedVehicle != null ? true : false;

                //update appointment
                const updatedAppointment = await prisma.appointment.update({
                    where:{
                        appointment_id: vehicleAppointment.appointment_id
                    },
                    data:{
                        status_id: status.status_id
                    }
                });

                if(updatedAppointment != null && verifyVehicleDelete == true){
                    //Send data
                    return res.status(200).json({
                        status: 200,
                        msg: "OK",
                        data:[
                            {updatedAppointment: updatedAppointment},
                            {deletedVehicle: deletedVehicle}
                        ]
                    });
                }

                //Appointment doesn´t exist
                return res.status(409).json({
                    status: 409,
                    msg: "Conflict",
                    errorMsg:"Ha ocurrido un problema al liberar el turno o eliminar el vehiculo",
                    data:[
                        {updatedAppointment: updatedAppointment},
                        {deletedVehicle: deletedVehicle}
                    ]
                });
            }

            //Appointment doesn´t exist
            return res.status(404).json({
                status: 404,
                msg: "Not Found",
                errorMsg:"No se ha encontrado ningun turno con los datos ingresados"
            });
        } 
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }   
    },

    deleteVehicle: async (req, res) => {
        try{
            //Search vehicle
            const vehicle = await prisma.vehicle.delete({
                where:{
                    license_plate: req.params.licenseplate
                }
            });

            //Vehicle exists
            if(vehicle  != null){
                    
                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: vehicle,
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

module.exports = vehicleController;