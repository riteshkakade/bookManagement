const { type } = require("express/lib/response")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "title is required",
        enum: ['Mr', 'Mrs', 'Miss'],
        trim: true
    },
    name: {
        type: String,
        required: "name is required",
        trim: true

    },
    phone: {
        type: String,
        unique: true,
        required: "phone no is required",
        validate: {
            validator: function (num) {
                return /^[6789]\d{9}$/.test(num);
            },
            message: "Please enter a valid Indian phone number",
        },
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email",
        },
        required: "email is required",
        trim: true
    },
    password: {
        type: String,
        required: "password is required",
        minlength: 8,
        maxlength: 15,
        trim: true
    },
    address: {
        street: String,
        city: String,
        pincode: String,

    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)