const { Router } = require('express')
const express = require('express')

const router = Router()

router.use('/auth/', require('./auth.routes'))

router.use('/class/', require('./class.routes'))

router.use('/class/', require('./news.routes'))
router.use('/class/', require('./signals.routes'))
router.use('/class/', require('./answers.routes'))
router.use('/class/', require('./materials.routes'))
router.use('/class/', require('./homeworks.routes'))
router.use('/class/', require('./grades.routes'))
router.use('/class/', require('./students.routes'))
router.use('/class/', require('./status.routes'))

router.use('/user/', require('./user.routes'))
router.use('/count/', require('./attendance_counter.routes'))

router.use('/file/', require('./files.routes'))

router.use('/uploads', express.static('../uploads'))

module.exports = router
