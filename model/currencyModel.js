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
    },
    currentRate: {
        type: Number,
        required: [true, 1],
    },
    previousRate: {
        type: Number,
        required: [true, 1],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Currency', CurrencySchema);
