const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    meta_title: {
        type: String,
        require: true,
    },
    meta_description: {
        type: String,
        require: true,
    },
    meta_keywords: {
        type: String,
        require: true,
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
    },
    created_at: {
        type: String,
        default: Date,
    },
    updated_at: {
        type: String,
        default: Date,
    },
});

module.exports = mongoose.model("StaticPage", schema);
