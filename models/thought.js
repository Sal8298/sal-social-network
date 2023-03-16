const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        username: {
            type: String,
            required: true,
        },

        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

    });

const thoughtSchema = new Schema(
    {

        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        username: {
            type: String,
            required: true,
        },

        createAt: {
            type: Date,
            default: Date.now,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

reactionSchema.virtual('reactionCount').
    get(
        function () {
            return this.reactions.length;
        });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;