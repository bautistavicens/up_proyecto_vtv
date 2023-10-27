const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const commonErrorsHandling = require('../utils/commonErrorsHandling.js');

const appointmentController = {

    getAllAppointmentPossibleStatus: async (req, res) =>{
        try{
            //Get all possible status for an appointment
            const status = await prisma.status.findMany({
                orderBy:{
                    status_id: 'asc'
                }
            });

            //Status exists
            if(status != null && status.length > 0){
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: status

                });
            } 

            //Status doesn´t exist
            return res.status(404).json({
                status: 404,
                msg: "Not Found",
                errorMsg:"No se ha encontrado el turno"
            });
        }
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    },

    createAvailableAppointmentOnDate: async (req, res) =>{
        try{
            //Construct Date
            const inDate = new Date(parseInt(req.body.year), parseInt(req.body.month) - 1, parseInt(req.body.day), parseInt(req.body.hours), parseInt(req.body.minutes));
            console.log(inDate);
            //Get free status value to contrast with db data.
            const freeStatus = process.env.APPOINTMENT_STATUS_LIBRE;

            //parse id param to int
            const branchId = parseInt(req.body.branchId);

            //Get status id of "free"
            const status = await prisma.status.findUnique({
                where:{
                    description: freeStatus
                },
                select:{
                    status_id: true
                }
            });

            //status found
            if(status  != null){
                //Create new appointment
                let appointment = await prisma.appointment.create({
                    data:{
                        date: inDate,
                        branch_id: branchId,
                        status_id: status.status_id
                    },
                });
                
                //Appointment created successfully
                if(appointment != null){

                    //Format Date
                    //appointment.date = appointment.date.toLocaleString(); 

                    //Send data
                    return res.status(200).json({
                        status: 200,
                        msg: "OK",
                        data: appointment,
        
                    });
                }
                //couldn´t create appointment
                else{
                    //Send error
                    return res.status(500).json({
                        status: 500,
                        msg: "Internal Server Error",
                        errorMsg:"No se ha podido registrar el turno"
                    }); 
                }
            }

            //"free" status not found
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


    bookAnAppointment: async (req, res) =>{
        try{
            //parse id param to int
            const appointmentId = parseInt(req.params.id);

            //Get free status value to contrast with db data.
            const freeStatus = process.env.APPOINTMENT_STATUS_LIBRE;

            //Get booked status value to contrast with db data.
            const bookedStatus = process.env.APPOINTMENT_STATUS_RESERVADO;


            //Get all appointments
            const appointment = await prisma.appointment.findUnique({
                where:{
                    appointment_id: appointmentId
                },
                select:{
                    appointment_id: true,
                    status:{
                        select:{
                            description: true
                        }
                    }
                }
            });

            //Appointment exists
            if(appointment  != null){
               
                //Apointment is free
                if(appointment.status.description == freeStatus){
                    //Get appointment status id to book appointment
                    const status = await prisma.status.findUnique({
                        where:{
                            description: bookedStatus
                        },
                        select:{
                            status_id: true
                        }
                    });

                    //update appointment
                    const bookedAppointment = await prisma.appointment.update({
                        where:{
                            appointment_id: appointment.appointment_id
                        },
                        data:{
                            status_id: status.status_id
                        }
                    });

                    const vehicle = await prisma.vehicle.create({
                        data:{
                            license_plate: req.body.licensePlate,
                            owner_first_name: req.body.ownerFirstName,
                            owner_last_name: req.body.ownerLastName,
                            owner_dni: req.body.ownerDNI,
                            origin_id: parseInt(req.body.originId),
                            appointment_id: appointment.appointment_id
                        }
                    });

                    //Send data
                    return res.status(200).json({
                        status: 200,
                        msg: "OK",
                        data:[
                            {
                               vehicle: vehicle 
                            },
                            {
                               appointment: bookedAppointment     
                            }
                        ],

                    });
                }  

                //Appointment is already taken
                else{
                    //Send error
                    return res.status(409).json({
                        status: 409,
                        msg: "Conflict",
                        errorMsg: "El turno ya ha sido tomado"

                    });
                }         
            }

            //Appointment doesn´t exist
            return res.status(404).json({
                status: 404,
                msg: "Not Found",
                errorMsg:"No se ha encontrado el turno"
            });
        } 
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    },

    cancelAnAppointment: async (req, res) =>{
        try{
            //parse id param to int
            const appointmentId = parseInt(req.params.id);

            //Get cancelled status value to contrast with db data.
            const cancelledStatus = process.env.APPOINTMENT_STATUS_CANCELADO;

            //Get all appointments
            const appointment = await prisma.appointment.findUnique({
                where:{
                    appointment_id: appointmentId
                },
                select:{
                    appointment_id: true,
                    status:{
                        select:{
                            description: true
                        }
                    }
                }
            });

            //Appointment exists
            if(appointment  != null){

                //Get appointment status id to book appointment
                const status = await prisma.status.findUnique({
                    where:{
                        description: cancelledStatus
                    },
                    select:{
                        status_id: true
                    }
                });

                //update appointment
                const cancelledAppointment = await prisma.appointment.update({
                    where:{
                        appointment_id: appointment.appointment_id
                    },
                    data:{
                        status_id: status.status_id
                    }
                });

                //Send data
                return res.status(200).json({
                    status: 200,
                    msg: "OK",
                    data: cancelledAppointment
                });
            }

            //Appointment doesn´t exist
            return res.status(404).json({
                status: 404,
                msg: "Not Found",
                errorMsg:"No se ha encontrado el turno"
            });
        } 
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    },

    deleteAnAppointment: async (req, res) =>{
        try{
            //parse id param to int
            const appointmentId = parseInt(req.params.id);

            //Get free status value to contrast with db data.
            const freeStatus = process.env.APPOINTMENT_STATUS_LIBRE;


            //Get appointment
            const appointment = await prisma.appointment.findUnique({
                where:{
                    appointment_id: appointmentId
                },
                select:{
                    appointment_id: true,
                    status:{
                        select:{
                            description: true
                        }
                    }
                }
            });

            //Appointment exists
            if(appointment  != null){
                //verofy if appointment status is "free"
                if(appointment.status.description == freeStatus){

                    //delete appointment
                    const deletedAppointment = await prisma.appointment.delete({
                        where:{
                            appointment_id: appointment.appointment_id
                        }
                    });

                    //Send data
                    return res.status(200).json({
                        status: 200,
                        msg: "OK",
                        data: deletedAppointment
                    });

                }
                //Appointment has antoher status instead of free
                else{
                    //Send error
                    return res.status(409).json({
                        status: 409,
                        msg: "Conflict",
                        errorMsg: "El turno debe estar LIBRE para poder ser eliminado"

                    });
                }
            }

            //Appointment doesn´t exist
            return res.status(404).json({
                status: 404,
                msg: "Not Found",
                errorMsg:"No se ha encontrado el turno"
            });
        } 
        catch(error){
            console.log(error);
            //common errors handling (500 & 503)
            return commonErrorsHandling(error, req, res);
        }
    },

}

module.exports = appointmentController;