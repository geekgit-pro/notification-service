const { TicketRepository } = require('../repositories');
const ticketRespository = new TicketRepository();
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Mailer } = require('../config');


async function sendEmail(mailFrom, mailTo, subject, text) {
    try {
        const response = await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Something went wrong while sending an Email Notification', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}


async function createTicket(data) {
    try {
        const response = await ticketRespository.create(data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Ticket object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
        
}


async function getPendingEmails(data) {
    try {
        const response = await ticketRespository.getPendingTickets(data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested PENDING emails not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Pendind Emails', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}