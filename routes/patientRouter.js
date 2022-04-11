const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

// patientRouter.get('/', patientController.getAllPatientData)

patientRouter.get('/login', (req, res) => {
    res.render('patient/patient-login')
})

patientRouter.get('/about-diabetes', (req, res) => {
    res.render('patient/about-diabetes')
})

patientRouter.get('/about-this-website', (req, res) => {
    res.render('patient/about-this-website')
})
module.exports = patientRouter
