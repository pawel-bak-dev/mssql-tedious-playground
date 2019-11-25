const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

class DatabaseUtils {
  constructor(config) {
    this.config = config;
  }

  createConnection() {
    return new Promise((resolve, reject) => {
      const connection = new Connection({
        authentication: {
          type: "default",
          options: {
            userName: this.config.username,
            password: this.config.password
          }
        },
        server: this.config.host,
        options: {
          port: this.config.port,
          database: this.config.database
        }
      });

      connection.on('connect', function () {
        return resolve(connection)
      });

      connection.on('error', function (err) {
        return reject(err)
      });
    })
  }

  async executeRequest(connection, index) {
    const sql = 'UPDATE dbo.a3_table_vessel SET created = @created WHERE id = 30';
    // const sql = 'INSERT INTO dbo.a3_table_vessel (id, created) VALUES (31, @created)';
    const insertDate = new Date(`2019-10-10 08:3${index}:36.504135`);
    const request = new Request(sql, function(err, data) {});
    request.addParameter('created', TYPES.DateTimeOffset, insertDate);

    return new Promise((resolve, reject) => {
      const self = this;
      connection.execSql(request);

      connection.on('errorMessage', async function(err) {
        console.log('err', err);
        await self.closeConnection(connection);
        return reject(err)
      });

      request.on('requestCompleted', async function () {
        console.log('completed');
        console.log('closing connections');
        await self.closeConnection(connection);
        resolve(`result-${index}`);
      });
    })
  }

  async closeConnection(connection) {
    return new Promise((resolve, reject) => {
      connection.close();
      connection.on('end', function(err) {
        console.log('connection closed');
        if (err) {
          return reject(err);
        }
        resolve();
      });
    })
  }


}

module.exports = DatabaseUtils;