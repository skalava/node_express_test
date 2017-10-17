const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();  

    var log = `${now} ::  ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log  + '\n', (err) => {
        if(err){
            console.log('unable to append to server log');
        }
    })
    next();
});

app.use((req, res)=>{
    res.render('Maintenance.hbs');
});
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})
app.get('/', (req, res) =>{
    // // res.send('<h1>hello express</h1>');
    // res.send({
    //     name: 'Sudheer',
    //     likes: [
    //         'Biking',
    //         'cities'
    //     ]
    // })
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to our app',
        pageTitle: 'Home page',
        // currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res) =>{
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About page',
        // currentYear: new Date().getFullYear()
    });
})

app.get('/Bad', (req, res) => {
    res.send({
        Code: 400,
        Error: 'Can not find the page'
    })
});

app.get('/contact us', (req, res)=>{

    res.send('<h1> Fill this form </h1>');

})
app.listen(3000, () =>{
    console.log('Server Started at 3000 port');
}); 
