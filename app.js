 const express = require("express");
const app = express();
const path = require("path");
// const bodyparser=require("body-parser");

// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port = 8000;



var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    Gender: String,
    phone: String,
    email: String,
    address: String,
    
  });


  const contact = mongoose.model('contact', contactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded());

// set the template engine as pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("your form has been submitted in the records")
    }).catch(()=>{
        res.status(400).send("your form has not been submitted")
    })
    // res.status(200).render('contact.pug');
});


app.listen(port, () => {
    console.log(`the application successfully starting on port ${port}`);
});