const MongoClient = require("mongodb").MongoClient;
const path_db = "mongodb://localhost:27017/btpn-agustino";

const client = new MongoClient(path_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = client;
