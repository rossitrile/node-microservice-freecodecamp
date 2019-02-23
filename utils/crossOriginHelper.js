const cors = require('cors');

module.exports = (app) => {
    app.options('*', cors());
    app.use(cors());
}