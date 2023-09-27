
const apointmentController = {

    getOneAppointment: (req, res) =>{
        try{
            const appointments;

            res.status(200).json({
                status: 200,
                msg: "OK"
                data: appointments,

            });
        } 
        catch(error){
            res.status(501).json({
                
            })
        }
    },


}