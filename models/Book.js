const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSChema = new Schema({
    user: {
        type: String,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    age: {
        type: int,
        default: 0
    },
    avatar: {
        type: String
    },
    adddate: {
        type: Date,
        default: Date.now
    }
})

module.exports = Book = mongoose.model("book", PostSChema);