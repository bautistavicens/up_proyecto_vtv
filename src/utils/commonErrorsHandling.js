//handling API common errors 
function commonErrorsHandling(error, req, res){
    
    //if the resource is not found in db.
   if(error.code == 'P2025'){
        return res.status(404).json({
            msg: "Not Found",
            status: 404
    });
   }

    //if DB service is down
    if(error.code === undefined ){
        return res.status(503).json({
            msg: "Service Unavailable", 
            status: 503
        });
    };

    //Any other error
    return res.status(500).json(
        {
            msg: "Internal Server Error", 
            status: 500
        }
    );
};


module.exports = commonErrorsHandling;