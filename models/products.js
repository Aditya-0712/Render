const mongoose = require('mongoose');

const struc = new mongoose.Schema({Prod_name:String, Prod_img:String, Prod_color:String, Prod_desc:String, Prod_price:String, Prod_brand:String, Prod_model:String, Prod_stock:String, Prod_review:Array});
const Product = mongoose.model("product", struc);

module.exports = class addProduct
{
    constructor(pname, pimg, pcol, pdesc, pprice, pbrand, pmod, pstock)
    {
        this.pname=pname;
        this.pimg=pimg;
        this.pcol=pcol;
        this.pdesc=pdesc;
        this.pprice=pprice;
        this.pbrand=pbrand;
        this.pmod=pmod;
        this.pstock=pstock;
    }

    append()
    {
        const upload = new Product({Prod_name:this.pname, Prod_img:this.pimg, Prod_color:this.pcol, Prod_desc:this.pdesc, Prod_price:this.pprice, Prod_brand:this.pbrand, Prod_model:this.pmod, Prod_stock:this.pstock, Prod_review:[]});
        upload.save();
    }

    static async getAllProd()
    {
        let temp;
        await Product.find().then(ans => {temp=ans});
        return temp;
    }

    static async fetchProduct(id)
    {
        let temp;
        await Product.findById(id).then(ans => {temp=ans});
        return temp;
    }

    static async addReview(id, user, rev)
    {
        await Product.findByIdAndUpdate(id, {$push:{Prod_review:{Rev_user:user, Rev:rev}}}).then();
    }

    static async searchReview(user, inp_id)
    {
        let temp;
        let exists = false;
        await Product.findById(inp_id).then(ans => {temp=ans.Prod_review});
        for (let i=0; i<temp.length; i++)
        {
            if (temp[i].Rev_user==user){exists=true; break}
        }
        return exists;
    }
}