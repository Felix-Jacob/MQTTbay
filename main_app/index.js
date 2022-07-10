const express = require('express');

const app = express();
const port = 3000;


// settings for pug
app.set('views', './views');
app.set('view engine', 'pug');

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

app.get('/main', (req, res) => {
    res.render('main'); 
});

app.get('/login', (req, res) => {
    res.render('login'); 
});

app.get('/addArticle', (req, res) => {
    res.render('addArticle'); 
});
