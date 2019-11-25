const config = require('./config');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const async = require('async');
const promisify = require('util').promisify;

const createConnectionPromise = promisify(createConnection);
const closeConnectionPromise = promisify(closeConnection);
const executeRequestPromise = promisify(executeRequest);

async function test() {
  const parents = [1,2,3];
  const indexs = [1,2,3,4,5,6,7,8];

  for(index of indexs) {
    const connection = await createConnectionPromise();
    const result = await executeRequestPromise(connection, index);
    console.log(result);
  }
}
test();

function createConnection(callback) {
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
      database: config.database
    }
  });

  connection.on('connect', function () {
    return callback(null, connection)
  });

  connection.on('error', function (err) {
    return callback(err)
  });
}

async function executeRequest(connection, index, callback) {
  const sql = 'UPDATE dbo.a3_table_vessel SET created = @created WHERE id = 30';
  // const sql = 'INSERT INTO dbo.a3_table_vessel (id, created) VALUES (31, @created)';
  const insertDate = new Date(`2019-10-10 08:3${index}:36.504135`);
  const request = new Request(sql, function(err, data) {});
  request.addParameter('created', TYPES.DateTimeOffset, insertDate);

  connection.execSql(request);

  connection.on('errorMessage', async function(err) {
    await closeConnectionPromise(connection);
    return callback(err)
  });

  request.on('requestCompleted', async function () {
    console.log('completed');
    console.log('closing connections');
    await closeConnectionPromise(connection);
    callback(null, `result-${index}`);
  });
}

function closeConnection(connection, callback) {
  connection.close();
  connection.on('end', function(err) {
    console.log('connection closed');
    if (err) {
      return callback(err);
    }
    callback();
  });
}

