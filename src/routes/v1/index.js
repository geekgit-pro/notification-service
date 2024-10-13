const express = require('express');
const app = express();

const router = express.Router();

const ticketRoutes = require('./ticket-routes');

const { InfoController, EmailController } = require('../../controllers');

router.get('/info', InfoController.info);

router.use('/tickets', ticketRoutes);


module.exports = router;