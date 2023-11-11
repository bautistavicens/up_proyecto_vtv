//@Author: Bautista
/*++++++++++++++++++++++++++ Requieres ++++++++++++++++++++++++++*/

//Express
const express = require("express");
const app = express();

//Cors
const cors = require("cors");

//Path
const path = require("path");

//Method-override
const methodOverride = require('method-override');

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


//API Router
const apiRouter = require(path.join(__dirname, '/routes/index.js'));


/*++++++++ Server Port ++++++++*/
const port = 3030;


/*++++++++ Server Startup Message ++++++++*/
const startupMessage = "Server Status: Online\nUrl: http://localhost:"+port+"/";


/*+++++++++++++Middleware´s (Don´t touch) ++++++++++++++*/
    /*For Json*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

    /*For PUT & DELETE */
app.use(methodOverride("_method"));

//Cors for client to consume API.
app.use(cors());


/*++++++++++++++++++ Startup (Don´t touch) ++++++++++++++++++++*/
app.listen(process.env.PORT || port, () => {
    console.log(startupMessage);
});


/*++++++++ API Router - invocation ++++++++*/
app.use('/api', apiRouter);