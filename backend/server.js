var express = require('express')
const app = express()

require("dotenv").config();
const cors =require('cors')
const port = process.env.PORT || 8080;
const cookie_parser=require("cookie-parser")
const mongoose =require('mongoose')
const routes = require('./routes/auth')
const category = require('./routes/category')
const passport = require('passport');
var path = require('path');
app.use(cors())
app.enable("trust proxy")

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookie_parser())

app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(`mongodb+srv://csinha2002:kyuoYqHpKHeAX2Hm@cluster0.krdhqyi.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})

mongoose.connection.on('connected',()=>{
    console.log('Database connected !')
})

app.use('/',routes)
app.use('/',category)


app.listen(port,()=> console.log(`Listening to port ${port} !!`))
