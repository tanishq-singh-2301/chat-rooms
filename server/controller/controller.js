// const connection = require('../database/connection');
// const db = connection();

exports.test = (req, res) => {
    res.json({ working: true }).status(200);

};