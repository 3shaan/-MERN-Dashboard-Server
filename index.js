const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require("dotenv").config();
const app = express();

//routes import
const clientRoutes = require('./Routes/clients.js') ;
const generalRoutes = require("./Routes/general.js"); ;
const managementRoutes = require("./Routes/management.js"); ;
const salesRoutes = require("./Routes/sales.js");


//middle ware

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes

app.use("/client", clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);


//mongoose connect
const port = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.USER_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log('server is running in', port);
    })
}).catch(err => console.log(err));