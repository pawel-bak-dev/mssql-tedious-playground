const orm = require('orm');

orm.connect("postgresql://webadmin:a3qr@localhost:5434/postgres", function (err, db) {
  if (err) throw err;

  var Message = db.define("messages", {
    messageId: String,
    messageHeaders: String,
    messageBody: String,
    createdDate: Date
  });

  const date = moment().minutes(-5).toISOString();
  console.log(date);

  db.sync(function(err) {
    if (err) throw err;

    Message.find({ surname: orm.lte(123) }, [], function (err, data) {
      console.log(data);
    });

  })
});