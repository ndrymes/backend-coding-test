const sqlite3 = require("sqlite3").verbose();
let db;
const connect = () => {
  if (process.env.NODE_ENV === "test") {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    db = new sqlite3.Database(":memory:");
    // use an in memory Db for test purpose
  }
  // For a production enviroment, This will not be an in memory db
  db = new sqlite3.Database(":memory:");
  return db;
};
module.exports = connect;
