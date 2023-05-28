const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const medicineSchema = mongoose.Schema({
    billId:{type:String,required:true,},
    userId:{type:String,required:true,},
    name:{type:String,required:true,},
    batch:{type:String,required:true},
    expiry:{type:String,required:true},
    rate:{type:Number,required:true},
    mrp:{type:Number,required:true},
    qty:{type:Number,required:true},
    pckVal:{type:Number,required:true},
    pck:{type:String,required:true},
    stock:{type:Number,required:true},
    disc:{type:Number,required:true},
    cgst:{type:Number,required:true},
    sgst:{type:Number,required:true},
    net:{type:Number,required:true},
});


const MedicineModel = mongoose.model('Medicine',medicineSchema);

module.exports = {
    MedicineSchema: medicineSchema,
    Medicine: MedicineModel
  };