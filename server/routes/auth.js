const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

const {adduser} = require('../controllers/auth.controller')
router.post('/register', adduser)


module.exports = router