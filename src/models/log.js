const { Schema, model } = require('mongoose');

const logSchema = new Schema(
    {
        mood: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
            required: false,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model('Log', logSchema);
