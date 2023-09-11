const exp = require('express');
const newProfile = require('../models/profiles');
const addProduct = require('../models/products');
const route = exp.Router();

route.get('/wishlist', async (req,res) => {
    if (!req.session.USER) {res.redirect('/warn')}
    else {

    const curr=req.session.USER;
    let temp;
    await newProfile.checkUsername(curr).then(ans => {temp=ans.Wishlist;});
    const arr=[];
    for (let i=0; i<temp.length; i++)
    {
        await addProduct.fetchProduct(temp[i]).then(ans => {arr.push(ans)});
    }

    const data = {arr:arr};
    res.render('wishlist', data);
    }
})

route.get('/addtoWishlist/:ID', async (req,res) => {
    if (!req.session.USER) {res.redirect('/warn')}
    else {
    
    const key = req.params.ID;
    const curr = req.session.USER;

    await newProfile.addToWishlist(curr, key).then();
    res.redirect('/wishlist');
    }
})

route.get('/delFromWish/:ID', async (req,res) => {
    const curr = req.session.USER;
    const key = req.params.ID;

    await newProfile.removeFromWish(curr, key).then();

    res.redirect('/wishlist');
})

route.get('/wishtocart', async (req,res) => {
    if (!req.session.USER) {res.redirect('/warn')}
    else {
    
    const curr = req.session.USER;
    let arr;
    await newProfile.checkUsername(curr).then(ans => {arr=ans.Wishlist});

    await newProfile.WishtoCart(curr, arr);

    res.redirect('/cart');
    }
})

module.exports=route;