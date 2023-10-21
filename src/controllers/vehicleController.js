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

    getCarAppointment: async (req, res) => {
        try{
            console.log(req.params.licenseplate);
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
        
    }

}

module.exports = vehicleController;