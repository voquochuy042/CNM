var express = require('express');
const mainController = require('./controllers/mainController');
var app = express();
app.use(express.json({ extenede: false }))
app.use(express.static('./views'))
app.set('view engine', 'ejs')
app.set('views', './views')
// app.get('/', function (req, res) {
//     return res.render('index')
// });
app.get('/', mainController.getIndex);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
