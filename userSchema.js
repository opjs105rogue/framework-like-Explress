const mongoose = require("mongoose");

const userModel = new mongoose.Schema( {
    name: String,
    password: String,

})


module.exports = mongoose.model('User', userModel);
// import mongoose from "mongoose";

// const postModel = mongoose.Schema({
//     author: {type: String, required: true},
//     title: {type: String, required: true},
//     content: {type: String, required: true},
//     picture: {type: String}
// })

// export default mongoose.model('Post', postModel);