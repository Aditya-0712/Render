const mongoose = require('mongoose');

const struc = new mongoose.Schema({Username:String, Email:String, Password:String, Id:String, Cart:Array, Orders:Array, Wishlist:Array});
const Profile = mongoose.model("profile", struc);

module.exports = class newProfile
{
    constructor(name, email, pass)
    {
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.id = Math.random().toString();
    }

    save_profile()
    {
        const uplaod = new Profile({Username:this.name, Email:this.email, Password:this.pass, Id:this.id, Cart:[], Orders:[], Wishlist:[]});
        uplaod.save();
    }

    static async checkUsername(input)
    {
        let check;
        await Profile.findOne({Username:input}).then(ans => {check=ans})
        return check;
    }

    static async checkEmail(input)
    {
        let check;
        await Profile.findOne({Email:input}).then(ans => {check=ans})
        return check;
    }

    static async addToCart(inp_name, inp_prod)
    {
        await Profile.findOneAndUpdate({Username:inp_name}, {$push:{Cart:inp_prod}}).then();
    }

    static async addToWishlist(inp_name, inp_prod)
    {
        await Profile.findOneAndUpdate({Username:inp_name}, {$push:{Wishlist:inp_prod}}).then();
    }

    static async removeFromCart(inp_name, inp_prod)
    {
        let temp;
        await Profile.findOne({Username:inp_name}).then(ans => {temp=ans.Cart;});
        
        for (let i=0; i<temp.length; i++)
        {
            if (temp[i]==inp_prod){temp.splice(i,1); break;}
        }

        await Profile.findOneAndUpdate({Username:inp_name}, {Cart:temp}).then();
    }

    static async removeFromWish(inp_name, inp_prod)
    {
        let temp;
        await Profile.findOne({Username:inp_name}).then(ans => {temp=ans.Wishlist;});
        
        for (let i=0; i<temp.length; i++)
        {
            if (temp[i]==inp_prod){temp.splice(i,1); break;}
        }

        await Profile.findOneAndUpdate({Username:inp_name}, {Wishlist:temp}).then();
    }

    static async order(inp_name)
    {
        let temp;
        await Profile.findOne({Username:inp_name}).then(ans => {temp=ans.Cart;});

        await Profile.findOneAndUpdate({Username:inp_name}, {Orders:temp}).then();
    }

    static async WishtoCart(inp_name, arr)
    {   
        let temp;
        await Profile.findOne({Username:inp_name}).then(ans => {temp=ans.Cart});

        for (let i=0; i<arr.length; i++)
        {
            let present=false;
            for (let j=0; j<temp.length; j++)
            {
                if (arr[i]==temp[j]){present=true; break}
            }

            if (present==false)
            {
                await Profile.findOneAndUpdate({Username:inp_name}, {$push:{Cart:arr[i]}});
            }
        }
    }

    static async updateOrder(inp_name, inp_order)
    {
        await Profile.findOneAndUpdate({Username:inp_name}, {$push:{Orders:inp_order}}).then();
    }
}