const router = require("express").Router();

const db = require("../db/db");

router
  .route("/ticket/t/:ticketId")
  .get((req, res) => {
    const ticketId = req.params.ticketId;
    const ticket = db.findById(ticketId);
    res.status(200).json(ticket);
  })
  .patch((req, res) => {
    const ticketId = req.params.ticketId;
    const updatedTicket = db.updateById(ticketId, req.body);
    res.status(200).json({ message: "Updated successfully", updatedTicket });
  })
  .delete((req, res) => {
    const ticketId = req.params.ticketId;
    db.deletById(ticketId);
    res.status(203).send();
  });

router
  .route("/ticket/u/:username")
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

router.post("/sell", (req, res) => {
  const { username, price } = req.body;
  const ticket = db.create(username, price);
  res.status(201).json({ message: "Ticket created successfully", ticket });
});
router.post("/bulk", (req, res) => {
  const { username, price, amount } = req.body;
  const tickets = db.bulkCreate(username, price, amount);
  res
    .status(201)
    .json({ message: "Bulk Tickets created successfully", tickets });
});
router.get("/draw", (req, res) => {
  const winnerCount = req.query.wc ?? 3;
  const winners = db.draw(winnerCount);
  res.status(200).json(winners);
});
router.get("", (req, res) => {
  const tickets = db.find();
  res.status(200).json(tickets);
});
module.exports = router;
