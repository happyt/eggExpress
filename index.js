/**
 * Created by Mortoni on 11/08/2015.
 */
var express  = require('express')
var app = express()
var fs = require('fs')
var _ = require('lodash')
var helpers = require('./helpers')

var bodyParser = require('body-parser')

var User = require('./db').User
// var users = []
//
//
//fs.readFile('usernames.json', {encoding: 'utf8'}, function (err, data) {
//    if (err) throw err;
//    JSON.parse(data).forEach(function(user)  {
//        user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
//        users.push(user)
//    })
//})

app.set('views', './views')
app.set('view engine', 'jade')

app.use('/images', express.static('images'))
app.use('/scripts', express.static('scripts'))
app.use(bodyParser.urlencoded({extended:true}))



app.get('/', function(req, res) {
//    res.send(JSON.stringify(users, null, 2))

//    var buffer = ''
//    users.forEach(function(user) {
//        buffer += '<a href="/' + user.username + '">' + user.name.full + '<br>'
//    })
//    res.send(buffer)

// pre-db    res.render('index', {users: users})

    User.find({}, function(err, users) {
        res.render('index', {users: users})
    })
})

//app.get(/ian.*/, function(req, res, next) {
//    console.log("SuperUser")
//    next()
//})

app.get('*.json', function (req,res ) {
  res.download('./users/' + req.path)
})


app.get('/data/:username',helpers.verifyUser, function (req, res ) {

})

app.get('/error/:username', function (req,res) {
    res.status(404).send('User ' + req.params.username + ' not found')
})

app.get('/data/:username', function (req, res ) {
    var username = req.params.username
    var user = helpers.getUser(username)
    res.json(user)
})

app.get('/:username', function (req, res ) {
    var username = req.params.username
    console.log(req.method, ' for ', "User name: " + req.params.username)
    User.findOne({username:username}, function(err, user) {
        res.render('user', {
            user: user,
            username: username,
            address: user.location
        })
    })
})

app.put('/:username', function (req, res ) {
    var username = req.params.username
    console.log(req.method, ' for ', "User name: " + req.params.username, ':', req.body)
    User.findOneAndUpdate({username:username}, {location:req.body}, function(err,user) {
        res.end()
    })
})

app.delete('/:username', function (req, res ) {
 //   var fp = helpers.getUserFilePath(req.params.username)
 //   fs.unlinkSync(fp)       // delete the file
    console.log(req.method, ' for ', "User name: " + req.params.username)
    res.sendStatus(200)
})

var server = app.listen(3000, function ( ) {
    console.log('Server running at http://localhost:' + server.address().port)
});

