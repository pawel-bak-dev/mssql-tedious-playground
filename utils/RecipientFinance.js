const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const RecipientFinance = function RecipientFinance(config, index) {
  this.config = config.recipient[index];
  this.index = 0;
};

RecipientFinance.prototype.connect = function() {
    let connection = null;
    try {
      connection = new Connection({
        authentication: {
          type: "default",
          options: {
            userName: this.config.username,
            password: this.config.password
          }
        },
        server: this.config.host,
        debug: true,
        options: {
          debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
          },
          encrypt: false,
          port: this.config.port,
          database: this.config.database
        }
      });

      connection.on('connect', function(err) {
        if (err) {
          console.log('error','sql', err);
        }
      });
    } catch (e) {
      connection = false;
      console.log('error', e);
    }
    return connection;
};


RecipientFinance.prototype.send = function (messageId, notification, callback) {
  const connection = this.connect();

  const sql = 'UPDATE dbo.a3_table_vessel SET created = @created WHERE id = 30';
  const insertDate = new Date(`2019-10-10 08:3${this.index}:36.504135`);
  const request = new Request(sql, function(err, data) {});
  request.addParameter('created', TYPES.DateTimeOffset, insertDate);
  this.index += 1;

  try {
    connection.on('connect', function (err) {
      connection.execSql(request);
    });

    request.on('requestCompleted', function () {
      console.log('completed');
      console.log('closing connections');
      connection.close();
    });

    connection.on('end', function (err) {
      console.log('connection closed');
      // console.log(self.connection);
    });
  } catch (error) {
    console.log('error', 'sql', error);
    // return callback(e, messageId, notification);
  }


  return this.index
};

module.exports = exports = RecipientFinance;
