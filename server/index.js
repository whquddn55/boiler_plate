const express = require('express');
const app = express();
const User = require('./models/User');
const auth = require('./middleware/auth');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요");
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if (err) return res.json({ success : false, err});
        return res.status(200).json({ success : true, ...req.body});
    });
});

app.post('/api/users/login', (req, res) => {
    User.findOne({ email : req.body.email }, (err, userInfo) => {
        if (!userInfo) {
            res.json({loginSuccess : false, message : "가입 되지 않은 이메일 입니다. 다시 한 번 확인해 주세요."});
        } else {
            userInfo.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    res.json({loginSuccess : false, message : "비밀번호가 틀렸습니다."});
                } else {
                    userInfo.generateToken((err, userInfo) => {
                        if (err) return res.status(400).send(err);
                        res.cookie("x_auth", userInfo.token).status(200).json({ loginSuccess : true, 
                            id : userInfo._id});
                    });
                }
            })
        }
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json( {
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        role : req.user.role,
        image : req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id : req.user._id}, 
        { token : ""}, (err, user) => {
            if (err) return res.json({success : false, err});
            return res.status(200).json({
                success : true
            });
        });
});

app.listen(3000, () => console.log("App started on port 3000"));