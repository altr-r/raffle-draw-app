const Ticket = require("../models/Ticket");

class MyDB {
  constructor() {
    this.tickets = [];
  }

  //create new ticket
  /**
   * create and save a new ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket}
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
  }

  // return all tickets
  find() {
    return this.tickets;
  }

  // single ticket find
  /**
   *
   * @param {string} ticketId
   * @returns {Ticket}
   */
  findById(ticketId) {
    const ticket = this.tickets.find(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => {
        ticket.id = ticketId;
      }
    );

    return ticket;
  }

  /**
   * find all the tickets under a certain username
   * @param {string} username
   * @returns {Array<Ticket>}
   */
  findByUsername(username) {
    const tickets = this.tickets.filter(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => ticket.username === username
    );
    return tickets;
  }

  // update ticket info
  /**
   *
   * @param {string} ticketId
   * @param {{username:string, price:number}} ticketBody
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    ticket.updatedAt = new Date();

    return ticket;
  }

  // delete ticket
  deletById(ticketId) {
    const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);

    if (index !== -1) {
      this.tickets.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * create multiple ticket for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} price
   * @returns {Array<Ticket>}
   */
  bulkCreate(username, price, amount) {
    const result = [];
    for (let i = 0; i < amount; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }

    return result;
  }

  // raffle draw
  /**
   *
   * @param {number} winnerCount
   */
  draw(winnerCount) {
    const indices = []; // Initialize as an empty array

    while (indices.length < winnerCount) {
      let index = Math.floor(Math.random() * this.tickets.length);
      if (!indices.includes(index)) {
        indices.push(index); // Add the index only if it's not already included
      }
    }

    const winners = indices.map((index) => this.tickets[index]);
    return winners;
  }
}

const myDB = new MyDB();

module.exports = myDB;

// this will ensure that there is only one database
// singleton pattern approach
