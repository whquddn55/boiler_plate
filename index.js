const express = require('express');
const app = express();
const User = require('./models/User');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const mongoURI = require('./config/key');
const mongoose = require('mongoose');
mongoose.connect(mongoURI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false,
}).then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello world!'));

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) 
            return res.json({ success : false, err});
        return res.status(200).json(req.body);
    });
});

app.listen(3000, () => console.log("App started on port 3000"));