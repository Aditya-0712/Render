const exp = require('express');
const route = exp.Router();
const path = require('path');

route.get('/warn', (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'warning.html'));
})

module.exports = route;