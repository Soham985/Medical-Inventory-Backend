const  {Medicine} = require('../models/medicine');
const PurchaseBill = require('../models/purchaseBill');
const SalesBill = require('../models/salesBill');

exports.addStock=async(req,res,next)=>{
    try{
        let response=await Medicine.insertMany(req.body);
        if(response){
            res.status(201).json({
                message:'Stock Added',
                status:201
            });
        }
        else{
            res.status(400).json({
                message: "Stock not added",
                status:400
            })
        }
    }catch(err){
        res.status(400).json({
            message: "Stock not added",
            status:400
        })
    }
   
}

exports.getStock=async(req,res,next)=>{
    try{
        let stocks = await Medicine.find({userId:req.userData.userId});
        res.status(201).json({
            status:200,
            body:stocks
        })

    }catch(err){
        res.status(400).json({
            message: "Cannot fetch stocks",
            status:400
        })
    }
}

exports.updateStock=async(req,res,next)=>{
    try{
        let response=await Medicine.updateOne({userId:req.userData.userId,batch:req.body.batch,name:req.body.name},{$set:{stock:req.body.stock}});
        if(response){
            res.status(201).json({
                status:201,
                message:'Stock updated'
            })
        }
        else{
            res.status(400).json({
                message: 'Update failed',
                status:400
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Update failed',
            status:400
        })
    }
}

exports.deleteStock=async(req,res,next)=>{
    try{
        let response=await Medicine.deleteOne({_id:req.params.id});
        if(response){
            res.status(201).json({
                status:201,
                message:'Stock deleted'
            })
        }
        else{
            res.status(400).json({
                message: 'delete failed',
                status:400
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'delete failed',
            status:400
        })
    }
}

exports.addPurchaseBill=async(req,res,next)=>{
    try{
        let response = await PurchaseBill.create(req.body);
        if(response){
            res.status(201).json({
                message:'Bill Added',
                status:201
            });
        }
        else{
            res.status(400).json({
                message: "Bill not added",
                status:400
            })
        }
    }catch(err){
        res.status(400).json({
            message: "Bill not added",
            status:400
        })
    }
}

exports.getPurchaseBill=async(req,res,next)=>{
    try{
        let query={userId:req.userData.userId,distributor:{$regex:req.query.distributorName,$options:'i'}}
        if(req.query.startDate!='null'|| req.query.endDate!='null'){
            query.purchaseDate={};
        }
        if(req.query.startDate!='null'){
            query.purchaseDate.$gte=req.query.startDate;
        }
        if(req.query.endDate!='null'){
            query.purchaseDate.$lte=req.query.endDate;
        }
        let response = await PurchaseBill.find(query).sort({purchaseDate:-1});
        if(response){
            res.status(201).json({
                status:201,
                body:response
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Error occurred",
            status:400
        })
    }
}

exports.deletePurchaseBill=async(req,res,next)=>{
    try{
        const billNo=req.params.billNo;
        let response=await PurchaseBill.deleteOne({billNo:billNo});
        console.log(response);
        res.status(201).json({
            status:201,
            message:'Bill removed'
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Error occurred",
            status:400
        })
    }
}


exports.addSalesBill=async(req,res,next)=>{
    try{
        let lastBill = await SalesBill.find().sort({date:-1}).limit(1);
        let billNo='';
        if(lastBill.length == 0){
            billNo = '00001'
        }
        else{
            billNo = Number(lastBill[0].billNo)+1;
            billNo = billNo.toString().padStart(5, '0');
        }
        req.body.billNo = billNo;
        let response = await SalesBill.create(req.body);
        if(response){
            console.log(response);
            res.status(201).json({
                message:'Bill Added',
                id:response._id,
                status:201
            });
        }
        else{
            res.status(400).json({
                message: "Bill not added",
                status:400
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Bill not added",
            status:400
        })
    }
}

exports.getSalesBills=async(req,res,next)=>{
    try{
        console.log(req.query.billNo);
        let query={userId:req.userData.userId,billNo:{$regex:req.query.billNo},patient:{$regex:req.query.patientName,$options:'i'}}
        if(req.query.startDate!='null'|| req.query.endDate!='null'){
            query.purchaseDate={};
        }
        if(req.query.startDate!='null'){
            query.purchaseDate.$gte=req.query.startDate;
        }
        if(req.query.endDate!='null'){
            query.purchaseDate.$lte=req.query.endDate;
        }
        let response = await SalesBill.find(query).sort({billNo:-1});
        console.log(req.query);
        if(response){
            res.status(201).json({
                status:201,
                body:response
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Error occurred",
            status:400
        })
    }
}

exports.getSalesBill=async(req,res,next)=>{
    const id=req.params.id;
    try{
        console.log(id);
        let response=await SalesBill.findOne({_id:id});
        console.log(response);
        if(response){
            res.status(201).json({
                body:response,
                status:201
            });
        }
        else{
            res.status(201).json({
                status:400
            });
        }
    }catch(err){
        console.log(err);
        res.status(201).json({
            status:400
        });
    }
}

exports.deleteSalesBill=async(req,res,next)=>{
    try{
        const billNo=req.params.billNo;
        let response=await SalesBill.deleteOne({billNo:billNo});
        console.log(response);
        res.status(201).json({
            status:201,
            message:'Bill removed'
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "Error occurred",
            status:400
        })
    }
}
