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
    createdLogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Log',
        },
    ],
});

module.exports = model('User', userSchema);
