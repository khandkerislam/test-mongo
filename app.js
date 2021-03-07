const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://test:test@myretro.k8kuq.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri);

app.post('/quotes', (req, res) => {
    console.log(req.body)
})

async function run() {


    await client.connect();
    console.log("Connected correctly to server");
    app.listen(3000, function(){
        console.log('listening on 3000');
    })
    app.use(express.json())

    const db = client.db('test')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', function (req, res){
        quotesCollection.findOne({test:"test"}, function(err, item){
            res.send('ok');
        })
        res.send('Hello World')
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne({text: 'wtf' }, function (
            err,
            info
        ) {
            res.send('Posted')
        })
    })
    app.post('/test', function (req, res){
        res.send('whats up')
    })
    

}

run().catch(console.dir);