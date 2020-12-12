const mongoose = require('mongoose');


const paymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }


}, { timestamps: true },
   { writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
   }}

)


const Payment = mongoose.model('Payment', paymentSchema);

module.exports =  Payment 