const express = require('express');
const exphbs = require('express-handlebars');

const patientController = require('./controllers/patient.js');

const app = express();
const port = 3000;


app.use(express.static('public'));
app.engine('hbs', exphbs.engine({
  defaultlayout: 'main',
  extname: 'hbs'
}))
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('splash/index.hbs');
});

app.get('/about-diabetes', (req, res) => {
  res.render('splash/about-diabetes.hbs');
})

app.get('/about-this-website', (req, res) => {
  res.render('splash/about-this-website.hbs');
})

app.get('/patientlogin', patientController.getLogin);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop');
});