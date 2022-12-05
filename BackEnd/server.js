
const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// getting-started.js
const mongoose = require('mongoose');

main().catch(error => console.log(error));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.eml4wfj.mongodb.net/?retryWrites=true&w=majority');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

// book schema which has title,cover and author
const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
  });

//compiling our schema into a Model
const bookModel = mongoose.model('books', bookSchema);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//get method (response) return the "hello world"
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/books',(req, res)=>{
    console.log(req.body);
    // create new document for model
    bookModel.create({
        title:req.body.title,
        cover:req.body.cover,
        author:req.body.author
    })
    //send reponse message 'Data Recieved' or show message 'book added'
    res.send('Data Recieved');
})

//in get method setting the route '/api/books'
app.get('/api/books', (req, res) => {
    //books array
    // const books = [
    //     {
    //         "title": "Learn Git in a Month of Lunches",
    //         "isbn": "1617292419", 
    //         "pageCount": 0, 
    //         "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/umali.jpg", 
    //         "status": "MEAP", 
    //         "authors": ["Rick Umali"], 
    //         "categories": [] 
    //     },
    //     { 
    //         "title": "MongoDB in Action, Second Edition", 
    //         "isbn": "1617291609", 
    //         "pageCount": 0, 
    //         "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker2.jpg", 
    //         "status": "MEAP", 
    //         "authors": ["Kyle Banker", "Peter Bakkum", "Tim Hawkins", "Shaun Verch", "Douglas Garrett"], 
    //         "categories": [] 
    //     },
    //     { 
    //         "title": "Getting MEAN with Mongo, Express, Angular, and Node", 
    //         "isbn": "1617292036", 
    //         "pageCount": 0, 
    //         "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sholmes.jpg", 
    //         "status": "MEAP", 
    //         "authors": ["Simon Holmes"], 
    //         "categories": [] 
    //     } 
    // ]

    // find the error or data from bookModel
    bookModel.find((error,data)=>{
        console.log(data);
        res.json(data);
    })  
})

//get data entering specific id in url
app.get('/api/books/:id',(req,res)=>{
    console.log(req.params.id);
    //find the data with id in bookModel
    bookModel.findById(req.params.id,(error,data)=>{
        res.json(data);
    })
})

// in this we find the record by id and update it
app.put('/api/books/:id',(req,res)=>{
    console.log("Update " +req.params.id);
    //find the data with id and update in bookModel
    bookModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(error,data)=>{
        res.json(data);
})
})

// in this we delete the record by id
app.delete('/api/books/:id',(req,res)=>{
    console.log("Deleting: " +req.params.id);
     //find the data with id and delete from bookModel
     bookModel.deleteOne({_id:req.params.id}, (error,data)=>{
        res.json(data);
})
})



//app.listen method return the written message with the port number
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})