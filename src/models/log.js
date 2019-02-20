const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    mood: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
    created: {
        type: Date,
        required: false,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = model('Log', userSchema);
