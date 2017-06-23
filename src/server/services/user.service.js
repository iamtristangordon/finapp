var config = require('config.json');
var _      = require('lodash');
var jwt    = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q      = require('q');
var mongo  = require('mongoskin');
var helper = require('sendgrid').mail;

var ObjectID = mongo.ObjectID;

var dbUrl = (process.env.NODE_ENV === 'production') ? config.prodConnectionString : config.connectionString;

var db = mongo.db(dbUrl, { native_parser: true });
db.bind('users');
 
var service = {};
 
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.addBudget = addBudget;
service.removeBudget = removeBudget;
service.getBudget = getBudget;
service.addExpense = addExpense;
service.removeExpense = removeExpense;
service.addIncome = addIncome;
service.removeIncome = removeIncome;
service.submitFeedback = submitFeedback;
 
module.exports = service;
 
function authenticate(email, password) {
    var deferred = Q.defer();
 
    db.users.findOne({ email: email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

function getBudget (_id) {
    var deferred = Q.defer();

    

    console.log(new ObjectID(_id));

    db.users.aggregate([
        {$match: {'budgets._id':  new ObjectID(_id)}},
        {$project: {
            budgets: {$filter: {
                input: '$budgets',
                as: 'budget',
                cond: {$eq: ['$$budget._id',  new ObjectID(_id)]}
            }},
            _id: 1
        }}
    ],function (err, budget){
        console.log(budget);
        if (err) deferred.reject(err.name + ': ' + err.message);
        
        deferred.resolve(budget);
    })

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();
 
    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });
 
        deferred.resolve(users);
    });
 
    return deferred.promise;
}
 
function getById(_id) {
    var deferred = Q.defer();
 
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}
 
function create(userParam) {
    var deferred = Q.defer();
 
    // validation
    db.users.findOne(
        { email: userParam.email },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (user) {
                // email already exists
                deferred.reject('email "' + userParam.email + '" is already taken');
            } else {
                createUser();
            }
        });
 
    function createUser() {
        // set user object to userParam wit hout the cleartext password
        var user = _.omit(userParam, 'password');
 
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
 
        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}
 
function update(_id, userParam) {
    var deferred = Q.defer();
 
    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user.email !== userParam.email) {
            // email has changed so check if the new email is already taken
            db.users.findOne(
                { email: userParam.email },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
 
                    if (user) {
                        // email already exists
                        deferred.reject('email "' + req.body.email + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });
 
    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            email: userParam.email,
        };
 
        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }
 
        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}

function addBudget(_id, budgetParam) {
    var deferred = Q.defer();
 
    
    updateBudgets();
 
    function updateBudgets() {
        var timestamp = new Date().getTime();

        

        var budgetObj = {
            budgets: {
                _id: new ObjectID(),
                name: budgetParam.budgetName,
                expenses: [],
                income: []
            }
        };

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $addToSet: budgetObj },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}

function removeBudget(_id, budgetId) {
    var deferred = Q.defer();  
    
    updateBudgets();
 
    function updateBudgets() {
        var id = {
            "budgets" : {
                _id: new ObjectID(budgetId)
            }
        };

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $pull: id },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}

function addExpense(_id, budgetId, expenseParams) {
    var deferred = Q.defer();

    updateExpenses();

    function updateExpenses() {
        var expenseObj = {
            "budgets.$.expenses": 
                {
                    _id: new ObjectID(),
                    amount: expenseParams.amount,
                    what: expenseParams.what
                }
        }
        db.users.update(
            { _id: mongo.helper.toObjectID(_id), "budgets._id": mongo.helper.toObjectID(budgetId)},
            { 
                $addToSet: expenseObj},
            function (err, doc){
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function removeExpense(_id, budgetId, expenseId) {
    var deferred = Q.defer();

    updateExpense();

    function updateExpense() {
    db.users.update(
        { _id: mongo.helper.toObjectID(_id), "budgets._id": mongo.helper.toObjectID(budgetId) },
            { $pull: {
            "budgets.$.expenses" : {
                _id: new ObjectID(expenseId)
            }
        } },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    }

    return deferred.promise;
}

function addIncome(_id, budgetId, incomeParams) {
    var deferred = Q.defer();

    updateIncome();

    function updateIncome() {
        var incomeObj = {
            "budgets.$.income": 
                {
                    _id: new ObjectID(),
                    amount: incomeParams.amount,
                    fromWhat: incomeParams.fromWhat
                }
        }
        db.users.update(
            { _id: mongo.helper.toObjectID(_id), "budgets._id": mongo.helper.toObjectID(budgetId)},
            { 
                $addToSet: incomeObj},
            function (err, doc){
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function removeIncome(_id, budgetId, incomeId) {
    var deferred = Q.defer();

    updateIncome();

    function updateIncome() {
    db.users.update(
        { _id: mongo.helper.toObjectID(_id), "budgets._id": mongo.helper.toObjectID(budgetId) },
            { $pull: {
            "budgets.$.income" : {
                _id: new ObjectID(incomeId)
            }
        } },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();
 
    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            deferred.resolve();
        });
 
    return deferred.promise;
}

function submitFeedback(emailObj) {
    var deferred = Q.defer();
    
    var from_email = new helper.Email('feedback@finapp.com');
	var to_email = new helper.Email('trxaugmented@gmail.com');
	var subject = "Application Feedback";
	var content = new helper.Content('text/plain', "name: " + emailObj.name + "\n\n" + "message: " + emailObj.message);
	var mail = new helper.Mail(from_email, subject, to_email, content);

	var sg = require('sendgrid')(process.env.FINAPP_API_KEY || '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');
	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});

	sg.API(request, function(error, response) {
		console.log(response.statusCode);
		console.log(response.body);
		console.log(response.headers);

		deferred.resolve(response);
	});

    return deferred.promise;
}
