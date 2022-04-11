const express = require('express')
const exphbs = require('express-handlebars')

const patientController = require('./controllers/patient.js')

const app = express()

app.use(express.static('public'))
app.engine(
    'hbs',
    exphbs.engine({
        defaultlayout: 'main',
        extname: 'hbs',
    })
)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('splash/index.hbs')
})

app.get('/about-diabetes', (req, res) => {
    res.render('splash/about-diabetes.hbs')
})

app.get('/about-this-website', (req, res) => {
    res.render('splash/about-this-website.hbs')
})

app.get('/patientlogin', patientController.getPatientLogin)

app.listen(process.env.PORT || 3000, () => {
    console.log('Diabetes@Home is running')
})

require('./models')
