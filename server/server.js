const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')
const env = require('../env').env
const app = express();
const RECIPES_COLLECTION = "recipes";
var ObjectID = mongodb.ObjectID;
var url = env.mongodb;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, function() {
        console.log('listening on 3000')
    })




// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}



app.get("/api/recipes", function(req, res) {
  db.collection(RECIPES_COLLECTION).find().toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get recipes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/recipes/:type", function(req, res) {
  db.collection(RECIPES_COLLECTION).find({"type": req.params.type}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get recipe.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.post("/api/recipes", function(req, res) {
  var newRecipe = req.body;

  db.collection(RECIPES_COLLECTION).insertOne(newRecipe, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new recipe.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.put("/api/recipes/:id", function(req, res) {
  delete req.body._id;

  db.collection(RECIPES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, req.body, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      res.status(204).end();
    }
  });
});


})





