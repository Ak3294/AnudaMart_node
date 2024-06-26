const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        // required: true
    },
    slug: {
        type: String,
        required: true,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    meta_title: {
        type: String,
    },
    meta_description: {
        type: String,
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        default: null,
    },
    created_at: {
        type: String,
        default: Date,
    },
    updated_at: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model("Category", Schema);
