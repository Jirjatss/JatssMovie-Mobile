const { MongoClient } = require("mongodb");
const pw = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://jirjatss:${pw}@jatssmovie.23d6pvg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const dbName = "jatssMovie";
let db;

async function connect() {
  try {
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (err) {
    throw err;
  }
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
