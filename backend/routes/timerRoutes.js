const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

const { setTimer, getTimer, updateTimer, deleteTimer, updateAllTimer } = require("../controllers/timerController")

router.post('/timer', authMiddleware, setTimer)
router.get('/timer', authMiddleware, getTimer)
router.put('/timer', authMiddleware, updateTimer)
router.put('/update-all-timers', authMiddleware, updateAllTimer)
router.delete('/timer/:timerId', authMiddleware, deleteTimer)

module.exports = router

