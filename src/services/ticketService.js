const TicketRepository = require('../repository/ticketRepository');

class TicketService {
  constructor(ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async createTicket(ticketData) {
    try {
      // Add any additional business logic/validation here
      const createdTicket = await this.ticketRepository.createTicket(ticketData);
      return createdTicket;
    } catch (error) {
      throw error;
    }
  }

  async getTickets() {
    try {
      // Add any additional logic for fetching tickets
      const tickets = await this.ticketRepository.getAllTickets(); // Implement this method in the repository
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  // Add more methods as needed for updating, deleting, or retrieving specific tickets
}

// Create an instance of the TicketRepository class
const ticketRepository = new TicketRepository();

// Create an instance of the TicketService class
const ticketService = new TicketService(ticketRepository);

module.exports = ticketService;
