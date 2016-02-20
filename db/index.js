var models = require('../models');

models.User
models.Tweet

module.exports = {
    list: function(attribute, include, cbSuccess, cbErr) {
        models[attribute].findAll({ include: [ models[include] ] })
         .then(function(data) {
                cbSuccess(data);
         }, function(err) {
                cbErr(err);
         });
    },
    add: function() {
        
    },
    find: function(attribute, value) {
        
    }
}