const sql = require('mssql');

async function connectionTest() {
  const config = {
    user: 'admin',
    password: 'Admin-123',
    server: 'localhost',
    port: 1400,
    database: 'testing'
  };

  let pool = await sql.connect(config);
  const request = pool.request()
  request.input('created', sql.Char(50),'2019-10-10 08:35:38.504135+00');
  request.query('UPDATE dbo.my_table_test SET created = @created WHERE id = 1', (err, result) => {
    console.dir(result)
  })
}

connectionTest();
