const mongoose = require('mongoose');

console.log(global.gConfig.db)

module.exports = mongoose.connect(global.gConfig.db, { useNewUrlParser: true })
    .then(() => console.log(`Connected to ${global.gConfig.db}`))
    .catch(e => console.log("Cannot connect to mongoDB"))