var kafka = require('kafka-node');
var client = new kafka.KafkaClient({ kafkaHost: '23.98.219.230:9092' });
var producer = new kafka.Producer(client);
exports.message = function sendMessage(cantidad, producto_id) {


    try {
        const message = {
            producto_id: producto_id,
            cantidad: cantidad
        };
        producer.on('ready', () => {
            console.log('producer is ready')
        });
        payload = [{
            topic: 'Ventas',
            messages: JSON.stringify(message),
        }]
        producer.send(payload, (error) => {
            console.log(payload);
        });
    } catch (err) {
        console.log(err);
    }
}