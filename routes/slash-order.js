const exp = require('express');
const newProfile = require('../models/profiles');
const route = exp.Router();
const path = require('path');
const newOrder = require('../models/orders');
const addProduct = require('../models/products');

route.get('/order', (req,res) => {
    if(!req.session.USER){res.redirect('/warn')}
    else{

    res.sendFile(path.join(__dirname, '../', 'views', 'order.html'));
    }
})

route.post('/placeorder', async (req,res) => {

    if(!req.session.USER){res.redirect('/warn')}
    else{

    const curr = req.session.USER;

    let temp;
    await newProfile.checkUsername(curr).then(ans => {temp=ans.Cart});

    // await newProfile.order(curr).then();
    const obj = new newOrder(curr, req.body.date, temp, req.body.ADDRESS, req.body.PHNO, req.body.EMAIL, req.body.payment);
    obj.upload();

    res.redirect('/account');
    }
})

route.get('/ordDet/:ID', async (req,res) => {
    if(!req.session.USER){res.redirect('/warn')}
    else{
    
    const key = req.params.ID;

    let order;
    await newOrder.getOrder(key).then(ans => {order=ans});

    const arr=[];
    for (let i=0; i<order.Products.length; i++)
    {
        await addProduct.fetchProduct(order.Products[i]).then(ans => {arr.push(ans)});
    }

    const data = {orderID:key, orderDate:order.Order_date, arr:arr, orderAddress:order.Address, orderPhno:order.Phno, orderEmail:order.Email, orderPay:order.Payment};

    res.render('orderDet', data);
    }
})

module.exports = route;