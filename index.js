  
const express = require('express');
const mongoose = require('mongoose');
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBro = require('admin-bro')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
var MemoryStore = require('memorystore')(expressSession)
const passport = require('passport');
const flash = require('connect-flash');
const path=require('path')

const app = express();
const adminRouter = require("./controller/admin");
app.use("/admin", adminRouter);;
const Insta = require("instamojo-nodejs");
const API_KEY = "test_93159a546960ec85f3f98347513";

const AUTH_KEY = "test_498df989c0feba12469edfc975f";

Insta.setKeys(API_KEY, AUTH_KEY);

Insta.isSandboxMode(true);


app.set('views', path.join( __dirname , '/views'))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));

const mongoURI = require('./config/monkoKEY.js');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, },).then(() =>
 console.log("Connected !"),);

app.use(cookieParser('random'));

app.use(expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
}));

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: "/admin",
    branding: {
      companyName: "PartyVenue",
      logo: "/images/shop-icon.png",
      softwareBrothers: false,
    }})
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error = req.flash('error');
    next();
});
app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css/styles1.css'))
app.use('/js',express.static(__dirname +'public/js/script1.js'))


app.use('/js',express.static(__dirname +'public/js/script.js'))
app.use('/images',express.static(__dirname +'/images'))

app.use(require('./controller/routes.js'));

const PORT = process.env.PORT || 8000;

const server=app.listen(PORT, () => console.log("Server Started At " + PORT));




const dbConnect = require('./db')
dbConnect()
const Comment = require('./model/comment')
app.use(express.json())
// Routes 
app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    })

})

app.get('/api/comments', (req, res) => {
    Comment.find().then(function(comments) {
        res.send(comments)
    })
})
let io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)
    // Recieve event
    socket.on('comment', (data) => {
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data) 
    })
})
