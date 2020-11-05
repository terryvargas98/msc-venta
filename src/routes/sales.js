const { Router } = require("express");

const router = Router();
const kafka = require('kafka-node');
const { json } = require("body-parser");
const producto = require("../model/producto");
var client = new kafka.KafkaClient({ kafkaHost: '23.99.182.90:9092' });
var producer = new kafka.Producer(client);

router.post('/addProducto', async(req, res) => {
    try {
        const productos = new producto({
            producto_id: req.body.producto_id,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            Created: new Date()
        });

        productos.save();


        res.json({ message: 'producto registrado con exito' });
    } catch (err) {
        res.end('error');
    }
});

router.get('/ListProducto/:id', async(req, res) => {
    try {
        const productos = await producto.find({ producto_id: req.params.id }).exec();
        return json(productos);
    } catch (erro) {
        res.json({ message: 'el producto no existe o existe algun error' })
    }
});
router.get('/ListarProductos', async(req, res) => {
    try {
        const productos = await producto.find({}).exec();
        res.json(productos);
        producer.on('ready', () => {
            console.log('producer is ready')
        });
        payload = [{
            topic: 'test',
            messages: JSON.stringify(productos)
        }]
        producer.send(payload, (error) => {
            console.log(payload);
        })
    } catch (erro) {
        res.json({ message: 'el producto no existe o existe algun error' })
    }
});


module.exports = router;