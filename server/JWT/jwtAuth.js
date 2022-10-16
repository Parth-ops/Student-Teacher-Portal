require('dotenv').config();
const jwt = require("jsonwebtoken");

function generateToken(userObj) {
    const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
}

function authenticateToken(req, res, next){

    const authHeader = req.headers['Authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = {
    generateToken,
    authenticateToken
};