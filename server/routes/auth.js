const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

const {adduser, loginuser} = require('../controllers/auth.controller')
router.post('/register', adduser)
router.post('/login', loginuser)


module.exports = router