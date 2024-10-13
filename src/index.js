const express = require('express');
const { PORT } = require('./config');
const { ServerConfig, Logger } = require('./config')
const app = express();
const apiRoutes = require('./routes');
const mailSender = require('./config/email-config');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const router = express.Router();

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, ()=> {
    console.log(`Successfully started the server at ${ServerConfig.PORT}`);
    Logger.info('Server is live', {});
    // try {
    //     const response = await mailSender.sendMail({
    //         from: ServerConfig.GMAIL_EMAIL,
    //         to: 'bibliophile.tech@gmail.com',
    //         subject: 'Do you want to become a DevOps Engineer?',
    //         text: 'If you do then, study hard instead of wasting time in office.'
    //     });
    //     console.log(response);
    // } catch (error) {
    //     console.log(error);
    // }

});