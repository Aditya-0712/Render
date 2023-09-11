const exp = require('express');
const path = require('path');
const route = exp.Router();
const newProfile = require('../models/profiles');
const session = require('express-session');

route.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
})

route.post('/register', async (req,res) => {
    
    var flag1,flag2,flag3;

    flag1='ok';
    if ((req.body.USERNAME).length<5) {flag1='short'}
    let temp;
    await newProfile.checkUsername(req.body.USERNAME).then(ans => {temp=ans});
    if(temp!=null) {flag1='occupied'}

    flag2='ok';
    const pattern = new RegExp("@gmail.com");
    if (!pattern.test(req.body.EMAIL)) {flag2='invalid'}
    let tmp;
    await newProfile.checkEmail(req.body.EMAIL).then(ans => {tmp=ans});
    if (tmp!=null) {flag2='occupied'}

    flag3='ok';
    if ((req.body.PASSWORD).length<8){flag3='short'}
    
    if (flag1=='ok' && flag2=='ok' && flag3=='ok')
    {
        const obj = new newProfile(req.body.USERNAME, req.body.EMAIL, req.body.PASSWORD);
        obj.save_profile();
        req.session.USER = req.body.USERNAME;
        res.redirect("/home");
    }
    else 
    {
        const data = {f1:flag1, f2:flag2, f3:flag3, Uval:req.body.USERNAME, Eval:req.body.EMAIL, Pval:req.body.PASSWORD};
        res.render('register', data);
    }
})

module.exports = route;