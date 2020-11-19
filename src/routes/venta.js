const { Router } = require("express");
const router = Router();
const producer = require('../kafka/producer');
const Venta = require('../model/Venta');


router.post('/addventa', async(req, res) => {

    try {
        const venta = new Venta({
            venta_id: req.body.venta_id,
            producto_id: req.body.producto_id,
            cantidad: req.body.cantidad,
            Created: new Date()
        });
        await venta.save();
        producer.message(venta.cantidad, venta.producto_id);
        res.status(200).send({ message: "register successful" });
    } catch (error) {
        res.status(500).send("Error save venta : " + error);
    }
});
router.get('/ListVenta', async(req, res) => {
    try {
        const ListVenta = await Venta.find({}).exec();

        res.status(200).send(JSON.stringify(Listventa));
    } catch (error) {
        res.status(500).send("Error  : " + error);
    }

})


module.exports = router;