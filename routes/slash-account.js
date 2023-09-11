const exp = require('express');
const newProfile = require('../models/profiles');
const addProduct = require('../models/products');
const newOrder = require('../models/orders');
const route = exp.Router();

route.get('/account',async (req,res) => {

    if(!req.session.USER){res.redirect('/warn')}
    else{

    const curr = req.session.USER;
    let prof;
    await newProfile.checkUsername(curr).then(ans => {prof=ans});

    let temp;
    await newOrder.getOrdersByUsername(curr).then(ans => {temp=ans});

    const data = {name:prof.Username, email:prof.Email, password:prof.Password, arr:temp};

    res.render('account', data);
    }
})

module.exports = route;