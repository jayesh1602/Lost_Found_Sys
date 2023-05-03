var express = require("express");
const app = express();
// var bodyParser = require('body-parser')
// const morgan =require('morgan')
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookie_parser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes/auth");
const category = require("./routes/category");
const passport = require("passport");
var path = require("path");
// const session = require('express-session');
// const cookieSession = require('cookie-session')
// require('./config/passport')(passport)

// app.use('/public',express.static('./uploads'))
app.enable("trust proxy");
// app.use(fileUpload())
// app.use(cors())//avoid inter port communication error
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cookie_parser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
//Data parsing
app.use(express.json());
// app.use(express.urlencoded({extended:false}))
//Express session
// app.use(session({
//     secret:'secret',
//     resave:true,
//     saveUninitialized:true
// }))
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(cookieSession({
//     name:'session',
//     keys:['key1','key2']
// }))
// passport.serializeUser(function(user, done) {
//     console.log('serialize')
//     done(null, user.email);
//   });

// passport.deserializeUser(function(id, done) {
//     console.log('deserialize')

//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
// });

// mongoose.connect('mongodb+srv://swarupkumar:eashok410@lfs.q2in2.mongodb.net/test',{
//     useNewUrlParser: true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// })

// `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gxmvk.mongodb.net/${process.env.MONGO_DB_DATABASE}`
mongoose.connect(
  "mongodb+srv://jayesh1602:M4YrrXmiBOQDNhED@cluster0.gxmvk.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("Database connected");
});

app.use("/", routes);
app.use("/", category);

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("Frontend/build"));
}

app.listen(port, () => console.log(`Listening to port ${port}`));
