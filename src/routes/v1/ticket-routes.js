const express = require('express');
const router = express.Router();
const { EmailController } = require('../../controllers');


router.post(
    '/',
    EmailController.create
);


module.exports = router;