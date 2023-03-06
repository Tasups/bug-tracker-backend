const express = require("express");
const router = express.Router();

const { createTicket } = require("../controllers/tickets");

// base url http://localhost:5000 ?

router.route("/dashboard/:id").post(createTicket);

module.exports = router;
