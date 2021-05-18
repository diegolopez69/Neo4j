const amqp = require('amqplib/callback_api');
const publishMessage = (sendMessage) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        console.log('error connecting');
        return;
    };

    connection.createChannel(function (error1, channel) {
        if (error1) {
            console.log('error creating channel');
            return;
        }
        const queue = 'Equipos';
        const msg = 'publicando mensaje a rabbitMq 2';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(sendMessage));
        console.log(" [x] Sent %s", sendMessage);
    });
    setTimeout(function () {
        connection.close();
        
        }, 500);
    });
}

module.exports = {publishMessage}