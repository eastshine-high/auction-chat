const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
        content: String,
        user: {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            name: String,
        },
    },
    {timestamp: true}
);
module.exports = mongoose.model("Message", messageSchema);
