const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSChema = new Schema({
    user:{
        type:String,
        ref:"users",
        required: true
    },
    name: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    likes:[//点赞
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"users"
            },
            name:String
        }
    ],
    comments:[//评论
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"users"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model("post",PostSChema);