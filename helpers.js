/**
 * Created by Mortoni on 12/08/2015.
 */
var fs = require('fs')
var _ = require('lodash')


function getUser(username) {
    var user = {}
    user.name = {}
    user.name.first = "zito"
    user.name.last = "morito"
    user.location = "Canada"
    return user
}

function getUserFilePath(username) {
// dummy
    return 'abc'
}

function verifyUser (req, res, next) {
    var fp = helpers.getUserFilePath(req.params.username)
    fs.exists(fp, function(yes) {
        if (yes) {
            next()
        } else {
            response.redirect('/error/' + req.params.username)
        }
    })
}

function saveUser(username, data) {
    console.log("SAVE data: " + username)
}



exports.getUser = getUser
exports.getUserFilePath = getUserFilePath
exports.saveUser = saveUser
exports.verifyUser = verifyUser
