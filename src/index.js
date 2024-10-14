const express = require('express');
const { PORT } = require('./config');
const { ServerConfig, Logger } = require('./config');
const { EmailService } = require('./services');
const amqplib = require('amqplib');
const app = express();
const apiRoutes = require('./routes');
const mailSender = require('./config/email-config');
const { data } = require('./utils/common/error-response');

async function connectQueue() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('noti-queue');
        channel.consume('noti-queue', async (data)=> {
            //console.log(`${Buffer.from(data.content)}`);
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            // const object = JSON.parse(data);
            await EmailService.sendEmail('notify.air.service@gmail.com', object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const router = express.Router();

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, async ()=> {
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
    await connectQueue();
    console.log('Queue is up');

});