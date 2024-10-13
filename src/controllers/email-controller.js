const { response } = require('express');
const { StatusCodes } = require('http-status-codes');
const { EmailService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function create(req, res) {
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        console.log(response);
        SuccessResponse.data = response;
        return res                                          
                .status(StatusCodes.CREATED)                
                .json(SuccessResponse);
         
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;                                       
        return res                                          
                .status(error.statusCode)  
                .json(ErrorResponse);  
    }
}


module.exports = {
    create
}