const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const purchaseBillSchema = mongoose.Schema({
    userId:{type:String,required:true,},
    distributor:{type:String,required:true},
    billNo:{type:String,required:true,unique:true},
    purchaseDate:{type:Date,required:true},
    discount:{type:Number,required:true},
    total:{type:Number,required:true},
    medicines:[{
        name: {type:String,required:true,},
        batch: {type:String,required:true,},
        expiry: {type:String,required:true,},
        rate:{type:Number,required:true,},
        mrp:{type:Number,required:true,},
        qty:{type:Number,required:true,},
        pckVal:{type:Number,required:true,},
        pck:{type:String,required:true,},
        cgst:{type:Number,required:true,},
        sgst:{type:Number,required:true,},
        disc:{type:Number,required:true,},
        net:{type:Number,required:true,}
    }]
});

purchaseBillSchema.plugin(uniqueValidator);

module.exports = mongoose.model('PurchaseBill',purchaseBillSchema);