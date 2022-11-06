const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');


require('./db/db').connectToMongoDB() 
require('dotenv').config()

require("./authentication/auth") //signup and login middlewear

const PORT = 8000

const app = express()
app.use(express.json());
//app.use('/user', userRoute)


app.use(bodyParser.urlencoded({ extended: false }));

 app.use('/user', userRoute)
 app.use('/blog', blogRoute)
 app.use('users', passport.authenticate('jwt', { session: false }), blogRoute);


 app.get('/testing', function(req, res, next) {
    return res.send("Test Route, Server is working!")
});



app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use(function (err, req, res, next) {
      console.log(err);
        res.status(err.status || 500);
        res.json({ error: err.message });
    });

mongoose.connect('mongodb://localhost:27017');
mongoose.connection.on("connected", () => {
 	//console.log("Connected to MongoDB Successfully");
});


mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port,', PORT)
 })