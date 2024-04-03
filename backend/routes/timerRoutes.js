const express = require('express');
const router = express.Router();

const { setTimer, getTimer, updateTimer } = require("../controllers/timerController")

router.post('/timer', setTimer)
router.get('/timer', getTimer)
router.put('/timer', updateTimer)

module.exports = router

