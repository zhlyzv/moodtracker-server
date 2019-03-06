const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        due: {
            type: Date,
            required: true,
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model('Goal', goalSchema);
