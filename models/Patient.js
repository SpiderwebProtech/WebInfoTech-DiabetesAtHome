const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    profile: {
        name: String,
    }
})

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;