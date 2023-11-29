const TicketDAO = require('../dao/ticketDAO');
const TicketDTO = require('../dto/ticketDTO');

class TicketRepository {
  async createTicket(ticketData) {
    const ticket = await TicketDAO.createTicket(ticketData);
    return new TicketDTO(ticket.event, ticket.price, ticket.user);
  }

  async getTicketById(ticketId) {
    const ticket = await TicketDAO.findTicketById(ticketId);
    return new TicketDTO(ticket.event, ticket.price, ticket.user);
  }


  async updateTicket(ticketId, updatedData) {
    try {
      // Find the ticket by its ID
      const ticket = await Ticket.findById(ticketId);

      if (!ticket) {
        throw new Error('Ticket not found');
      }

      // Update the ticket data with the provided updated data
      Object.assign(ticket, updatedData);

      // Save the updated ticket
      return ticket.save();
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(ticketId) {
    try {
      // Find the ticket by its ID and remove it
      const deletedTicket = await Ticket.findByIdAndRemove(ticketId);

      if (!deletedTicket) {
        throw new Error('Ticket not found');
      }

      return deletedTicket;
    } catch (error) {
      throw error;
    }
  }
}

// Create an instance of the TicketRepository class
const ticketRepository = new TicketRepository();

// Export the instance of the TicketRepository class
module.exports = ticketRepository;
