const Patient = require('../models/patientModel')

const getAllPatientData = async (req, res, next) => {
    try {
        const patient = await Patient.find().lean()
        return res.render('allData', { data: patient })
    } catch (err) {
        return next(err)
    }
}

const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.patient_id).lean()
        if (!patient) {
            return res.sendStatus(404)
        }
        return res.render('oneData', { oneItem: patient })
    } catch (err) {
        return next(err)
    }
}

const getPatientLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
    res.render('account/patientlogin', {
        title: 'Login',
    })
}

module.exports = { getAllPatientData, getPatientById, getPatientLogin }
