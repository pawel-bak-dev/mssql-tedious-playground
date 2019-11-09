const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES
const config = require('./config.js');

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
      useUTC: false
    }
  });

  const sql = 'UPDATE dbo.my_table_test SET created = @created WHERE id = 1';

  const request = new Request(sql, function(err, data) {
    console.log(err);
  });

  request.addParameter('created', TYPES.DateTimeOffset, '2019-10-10 08:35:38.504135+00');

  request.on('prepared', function () {
    console.log('on prepared');
    const obj = {
      created: new Date('2019-10-10 08:35:38.504135+00')
    };
    connection.execute(request, obj);
  });

  connection.on('connect', function(err) {
    return connection.prepare(request);
  });

}

connectionTest();
