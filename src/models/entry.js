const { Schema, model } = require('mongoose');

const entrySchema = new Schema(
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

module.exports = model('Entry', entrySchema);
