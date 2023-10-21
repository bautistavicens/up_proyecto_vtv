const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const appointmentController = {

    getOneAvailableAppointment: (req, res) =>{
        try{
            console.log(typeof(req.params.date));

            /*const inDate = new Date("2023-03-25, 11:20:00");

            const appointments = prisma.appointment.findMany({
                where:{
                    date: req.params.date
                },
                select:{

                }
            });*/

            res.status(200).json({
                status: 200,
                msg: "OK",
                //data: appointments,

            });
        } 
        catch(error){
            res.status(501).json({
                
            })
        }
    },


}