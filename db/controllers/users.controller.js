const {selectAllUsers} = require('../models/users.model.js')

function getAllUsers(req, res, next) {
    selectAllUsers()
    .then((usersArr) => {
        res.status(200).send({usersArr})
    })
}

module.exports = {getAllUsers}