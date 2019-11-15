const dbConfig = require('./config.js');
const RecipientFinance = require('../utils/RecipientFinance');
const config = require('../utils/config');

var express = require('express');
var app = express();
app.get('/', function (req, res) {
  connectionTest()
});
app.listen(5000, () => console.log('Serwer running'));

const recipientFinance = new RecipientFinance(config, 0)

function connectionTest() {
  const result = recipientFinance.send();
  console.log(result);
};


  // const connection = new Connection({
  //   authentication: {
  //     type: "default",
  //     options: {
  //       userName: config.username,
  //       password: config.password
  //     }
  //   },
  //   server: config.host,
  //   options: {
  //     port: config.port,
  //     database: config.database
  //   }
  // });
  //
  // console.log(connection);
  // const sql = 'UPDATE dbo.a3_table_vessel SET created = @created WHERE id = 30';
  // const insertDate = new Date(`2019-10-10 08:3${index}:36.504135`);
  // index += 1;
  // const request = new Request(sql, function(err, data) {});
  // request.addParameter('created', TYPES.DateTimeOffset, insertDate);
  //
  // request.on('requestCompleted', function (data) {
  //   console.log('completed', data);
  //   console.log('closing connections');
  //   connection.close();
  // });
  //
  // connection.on('connect', function(err) {
  //   connection.execSql(request);
  // });
  //
  // connection.on('end', function(err) {
  //   console.log('connection closed');
  //   console.log(connection);
  // });

