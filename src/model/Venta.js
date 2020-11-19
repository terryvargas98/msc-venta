const { model, Schema } = require('mongoose');

const SchemaVenta = new Schema({
    venta_id: {
        type: Number,
        required: true
    },
    producto_id: {
        type: String,
        required: true,
    },
    cantidad: {
        type: String,
        required: true
    },
    Created: {
        type: Date,
        required: true
    },
})

module.exports = model('venta', SchemaVenta);