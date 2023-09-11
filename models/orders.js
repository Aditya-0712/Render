const mongoose = require('mongoose');
const newProfile = require('./profiles');

const struc = new mongoose.Schema({Username:String, Order_date:String, Products:Array, Order_Id:String, Address:String, Phno:String, Email:String, Payment:String});
const Order = mongoose.model("order", struc);

module.exports = class newOrder
{
    constructor(name, date, arr, address, phno, email, pay)
    {
        this.name=name;
        this.date=date;
        this.arr=arr;
        this.order_ID = Math.random().toString();
        this.address=address;
        this.phno=phno;
        this.email=email;
        this.pay=pay;
    }

    async upload()
    {
        const up = new Order({Username:this.name, Order_date:this.date, Products:this.arr, Order_Id:this.order_ID, Address:this.address, Phno:this.phno, Email:this.email, Payment:this.pay});
        up.save();

        await newProfile.updateOrder(this.name, this.order_ID).then();
    }

    static async getOrder(ID)
    {
        let temp;
        await Order.findOne({Order_Id:ID}).then(ans => {temp=ans});
        return temp;
    }

    static async getOrdersByUsername(inp_name)
    {
        let temp;
        await Order.find({Username:inp_name}).then(ans => {temp=ans});
        return temp;
    }
}