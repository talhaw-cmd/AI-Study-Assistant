const mongoose = require('mongoose')
const user = require('../models/user')

let adduser = async(req, res)=>{
    let {
        fullname, 
        email,
        password,
        role,
        avatar,
        gender,
        phone
        }  = req.body
        try {
        let adduser = new  user({
        fullname, 
        email,
        password,
        role,
        avatar,
        gender,
        phone
    })
    let saveduser = await adduser.save()
    res.status(200).send(saveduser)

        } catch (error) {
            res.status(500).send(error)
        }

}

module.exports = {adduser}