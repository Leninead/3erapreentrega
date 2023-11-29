const Ticket = require('../models/ticket.model');

async function createTicket(req, res) {
    try {
        // 1. Input Validation
        const validationResult = validateTicketInput(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: 'Invalid input data', details: validationResult.error.details });
        }

        const { event, price, userId } = validationResult.value;

        // 2. Create a New Ticket
        const ticket = new Ticket({
            event,
            price,
            user: userId, // Assuming you have user information available in the request
        });

        // 3. Save Ticket to the Database
        await ticket.save();

        // 4. Response
        res.status(201).json({ message: 'Ticket created successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Validate ticket input data using Joi or your preferred validation library
function validateTicketInput(data) {
    const Joi = require('joi');

    const schema = Joi.object({
        event: Joi.string().required(),
        price: Joi.number().required(),
        userId: Joi.string().required(),
    });

    return schema.validate(data);
}

async function getTickets(req, res) {
    try {
        // Fetch all tickets from the database
        const tickets = await Ticket.find();

        // Respond with the retrieved tickets
        res.status(200).json(tickets);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = {
    createTicket,
    getTickets,
};
