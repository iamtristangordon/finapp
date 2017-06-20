var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
 
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.get('/:_id', getOne);
router.post('/budget/:_id', addBudget);
router.delete('/budget/:_id/:budgetId', removeBudget);
router.get('/budget/:_id', getBudget);
router.post('/expense/:_id/:budgetId', addExpense);
router.delete('/expense/:_id/:budgetId/:expenseId', removeExpense);
 
module.exports = router;
 
function authenticate(req, res) {
    userService.authenticate(req.body.email, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('email or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getOne(req, res) {
    console.log(req.params._id);
    userService.getById(req.params._id)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function getCurrent(req, res) {
    console.log(req.user.sub);
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addBudget(req, res) {
    userService.addBudget(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function removeBudget(req, res) {
    userService.removeBudget(req.params._id, req.params.budgetId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getBudget(req, res) {
    userService.getBudget(req.params._id)
        .then(function (budget) {
            if (budget) {
                console.log(budget);
                res.send(budget);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addExpense(req, res) {
    userService.addExpense(req.params._id, req.params.budgetId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function removeExpense(req, res) {
    userService.removeExpense(req.params._id, req.params.budgetId, req.params.expenseId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}