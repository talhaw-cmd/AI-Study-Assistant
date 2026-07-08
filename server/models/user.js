const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student"
    },

    avatar: {
        public_id: String,
        url: String
    },

    gender: {
        type: String,
        enum: ["Male", "Female"]},

    phone: String,

    // isVerified: {
    //     type: Boolean,
    //     default: false
    // }

},
{
    timestamps: true

})

module.exports = mongoose.model("user", userSchema)