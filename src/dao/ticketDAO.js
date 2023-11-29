// ticketDAO.js
const Ticket = require('../models/ticket.model');

class TicketDAO {
  async createTicket(ticketData) {
    try {
      const newTicket = new Ticket(ticketData);
      return await newTicket.save();
    } catch (error) {
      throw new Error('Failed to create a new ticket');
    }
  }

  async findTicketById(ticketId) {
    try {
      return await Ticket.findById(ticketId);
    } catch (error) {
      throw new Error('Failed to find the ticket');
    }
  }

  async updateTicket(ticketId, updatedData) {
    try {
      return await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true });
    } catch (error) {
      throw new Error('Failed to update the ticket');
    }
  }

  async deleteTicket(ticketId) {
    try {
      return await Ticket.findByIdAndRemove(ticketId);
    } catch (error) {
      throw new Error('Failed to delete the ticket');
    }
  }

  // Add a new method to get all tickets
  async getAllTickets() {
    try {
      return await Ticket.find();
    } catch (error) {
      throw new Error('Failed to get all tickets');
    }
  }
}

// Create an instance of the TicketDAO class
const ticketDAO = new TicketDAO();

// Export the instance of the TicketDAO class
module.exports = ticketDAO;
