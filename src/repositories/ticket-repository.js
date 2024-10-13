const CrudRepository = require('./crud-repository');
const { Ticket } = require('../models');
const AppError = require('../utils/errors/app-error');
const { where } = require('sequelize');

class TicketRepository extends CrudRepository {
    constructor() {
        super(Ticket);
    }

    async getPendingTickets(data) {
            const response = await Ticket.findAll({
                where: {
                    stautus: 'PENDING'
                }
            });
            console.log(response);
            if(!response) {
                throw new AppError('Could not find any pending ticket', StatusCodes.NOT_FOUND);
            }
            return response; 
    }
}

module.exports = TicketRepository;