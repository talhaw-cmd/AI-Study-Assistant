const mongoose = require('mongoose')
const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//adduser
let adduser = async (req, res) => {
    let {
        fullname,
        email,
        password,
        role,
        avatar,
        gender,
        phone
    } = req.body
    try {
        let existinguser = await user.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ message: "Email already registered" })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        let adduser = new user({
            fullname,
            email,
            password: hashedpassword,
            role,
            avatar,
            gender,
            phone
        })
        let saveduser = await adduser.save()
        res.status(200).json({ "message": "User added" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": error.message })
    }

}

//loginuser
let loginuser = async (req, res) => {
    try {
        let { email, password } = req.body
        let data = await user.findOne({ email })
        if (!data) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        let verifysuser = await bcrypt.compare(password, data.password)

        if (!verifysuser) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        let token = jwt.sign({
            id: data._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: "Login successful",
            user: {
                id: data._id,
                fullname: data.fullname,
                email: data.email,
                role: data.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}

module.exports = { adduser, loginuser }