const express = require('express')
const exphbs = require('express-handlebars')

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
    res.render('index.hbs')
})


const patientRouter = require('./routes/patientRouter')
const clinicianRouter = require('./routes/clinicianRouter')

app.use('/patient', patientRouter)
app.use('/clinician', clinicianRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('Diabetes@Home is running')
})

require('./models')
