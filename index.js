var express = require('express');
var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

const uri = "mongodb+srv://test:test@myretro.k8kuq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);


async function run() {

    await client.connect();

    const db = client.db('test')
    const quotesCollection = db.collection('quotes');

    // Start the application after the database connection is ready
    app.use(express.json())
    app.listen(3000);


    console.log("Listening on port 3000");

    // Reuse database object in request handlers
    app.get("/", function(req, res) {
       quotesCollection.find({}, function(err, docs) {
            docs.each(function(err, doc) {
            if(doc) {
                console.log(doc);
            }
            else {
                res.end();
            }
            });
        });
    })

    app.post("/quotes", function(req, res){
        quotesCollection.insertOne({text: req.body.text}, function (
            err,
            info
        ) {
            console.log(req.body);
            res.json(info.ops[0])
        })
    })

}

run().catch(console.dir);