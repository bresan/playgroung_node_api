const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

const app = express();

const port = 8000;

app.listen(port, () => {
    console.log('Hello world! ' + port);
});