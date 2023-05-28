const mongoose = require('mongoose');
const  {MedicineSchema} = require('./medicine');
//const uniqueValidator = require("mongoose-unique-validator");

const salesBillSchema = mongoose.Schema({
    userId:{type:String,required:true,},
    billNo:{type:String,required:true,},
    patient:{type:String,required:true},
    doctor:{type:String,required:true,unique:true},
    date:{type:Date,required:true},
    discount:{type:Number,required:true},
    total:{type:Number,required:true},
    medicines:[{
        name: {type:String,required:true,},
        batch: {type:String,required:true,},
        expiry: {type:String,required:true,},
        mrp:{type:Number,required:true,},
        stock:{type:Number,required:true,},
        qty:{type:Number,required:true,},
        net:{type:Number,required:true,}
    }]
});

//purchaseBillSchema.plugin(uniqueValidator);

module.exports = mongoose.model('SalesBill',salesBillSchema);