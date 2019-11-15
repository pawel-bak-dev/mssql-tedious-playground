const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const config = require('./config.js');
const moment = require('moment');

function connectionTest() {

  const connection = new Connection({
    authentication: {
      type: "default",
      options: {
        userName: config.username,
        password: config.password
      }
    },
    server: config.host,
    options: {
      port: config.port,
      database: config.database,
      // useUTC: false
    }
  });

  const sql = 'SELECT created FROM dbo.a3_table_vessel WHERE id = 30';

  connection.on('connect', function(err) {
    executeStatement();
  });

  function executeStatement() {
    const request = new Request(sql, function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
    });

    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
    });

    connection.execSql(request);
  }

}

connectionTest();
