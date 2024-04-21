const express = require('express');
const router = express.Router();

const { createUser, login } = require("../controllers/userController")


router.post('/sign-in', createUser)
router.post('/log-in', login)


module.exports = router
