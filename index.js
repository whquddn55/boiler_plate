const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://thuthi:whxnxl55;;@main.2tghz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false,
}).then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello world!'));

app.listen(3000, () => console.log("App started on port 3000"));