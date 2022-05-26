const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); 
const User = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // retrieve token from header ~ "Bearer Token"
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //extract user for protected routes and omit pw form object
            req.user = await User.findById(decoded.id).select('-password')
            //continue
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not Authorised');
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Rejected - no auth token');
    }


});

module.exports = { protect };