<<<<<<< HEAD
console.log('Starting app...');
const express = require('express');
const bodyParser = require('body-parser');
const sqlRoutes = require('./routes/sqlRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', sqlRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
=======
// is this thing on
>>>>>>> 2cbf061f477ce5fc1573af8c7e6b22eaf538a00a
