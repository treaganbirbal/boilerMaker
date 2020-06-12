const express = require('express')
const app = express();
const morgan = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const passport = require('passport')
const db =require('./db')

const dbStore = new SequelizeStore({ db: db })


app.use(morgan('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', require('./routes'))

dbStore.sync()

app.use(session({
    secret: process.env.SESSION_SECRET || "insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user, done) => {
    try {
        done(null, user.id)
    } catch (error) {
        done(error)
    }
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.models.user.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})


app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.')
}) 

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Your server  is listening on port ${port}`)
})