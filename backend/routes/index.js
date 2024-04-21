const express = require('express');
const router = express.Router();

const timerRoutes = require("./timerRoutes")
const userRoutes = require('./authRoutes')


router.use(timerRoutes, userRoutes)

module.exports = router
