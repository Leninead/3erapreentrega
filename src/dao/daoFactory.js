
const CartDAO = require('./cartDAO');
const TicketDAO = require('./ticketDAO');

class DAOFactory {
  static getDAO(type) {
    switch (type) {
      case 'cart':
        return new CartDAO();
      case 'ticket':
        return new TicketDAO();
      default:
        throw new Error('Invalid DAO type');
    }
  }
}

module.exports = DAOFactory;
