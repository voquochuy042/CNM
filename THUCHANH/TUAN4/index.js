const express = require('express');
const app = express();
const port = 3000;

let courses = require('./data');

app.use(express.static('./views'))

//config view
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
    return res.render('index', { courses });//send data to ejs
})
app.listen(port, () => {
    console.log(courses);
})
