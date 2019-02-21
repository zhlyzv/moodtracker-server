const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    entries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Entry',
        },
    ],
});

module.exports = model('User', userSchema);
