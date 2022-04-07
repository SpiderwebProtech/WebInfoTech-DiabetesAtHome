const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;

const patientController = require('./controllers/patient');

const app = express();

app.get('/');
app.get('/patientlogin', patientController.getLogin);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('Press CTRL-C to stop');
});