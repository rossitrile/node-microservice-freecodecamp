const mongoose = require('mongoose');


module.exports = mongoose.connect(global.gConfig.db, { useNewUrlParser: true })
    .then(() => console.log(`Connected to ${global.gConfig.db}`))
    .catch(e => console.log("Cannot connect to mongoDB"))