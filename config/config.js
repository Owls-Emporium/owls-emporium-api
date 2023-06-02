const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
};

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(114,function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host':'127.0.0.1',
    'port':'5432',
    'database': 'market_owls_db',
    'user':'role_owls',
    'password':'p1sw0rd'
};

const db = pgp(databaseConfig);

module.exports = db;