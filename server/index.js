const express = require("express");
const cors = require("cors");
const routes = require('./routes/route.js'); // import the routes
const app = express();
const PORT = process.env.PORT || 9002;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('', routes); //to use the routes






const listener = app.listen(PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});