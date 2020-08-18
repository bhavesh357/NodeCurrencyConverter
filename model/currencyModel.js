const mongoose= require('mongoose');

// eslint-disable-next-line new-cap
const CurrencySchema = mongoose.Schema({
    shortName: {
        type: String,
        required: [true, ''],
    },
    longName: {
        type: String,
        required: [true, ''],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Currency', CurrencySchema);
