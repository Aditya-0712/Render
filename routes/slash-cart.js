const exp = require('express');
const newProfile = require('../models/profiles');
const addProduct = require('../models/products');
const route = exp.Router();

route.get('/addCart/:key',async (req,res) => {
    const prodID = req.params.key;

    const curr = req.session.USER;
    await newProfile.addToCart(curr, prodID).then();
    res.redirect('/cart');
})

route.get('/cart',async (req,res) => {

    if(!req.session.USER){res.redirect('/warn')}
    else{

    const curr = req.session.USER;
    let temp;
    await newProfile.checkUsername(curr).then(ans => {
        temp=ans.Cart;
    });
    const ProdArray=[];
    for (let i=0; i<temp.length; i++)
    {
        await addProduct.fetchProduct(temp[i]).then(ans => {ProdArray.push(ans)});
    }
    const data = {arr:ProdArray};
    res.render('cart', data);
    }
})

route.get('/del/:ID',async (req,res) => {
    const key = req.params.ID;

    const curr = req.session.USER;

    await newProfile.removeFromCart(curr, key).then();
    res.redirect('/cart');
})

module.exports = route;