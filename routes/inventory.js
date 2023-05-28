const express = require("express");

const InventoryController = require('../controller/inventory');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post("/stocks",checkAuth,InventoryController.addStock);

router.get("/stocks",checkAuth,InventoryController.getStock);

router.put("/stocks",checkAuth,InventoryController.updateStock);

router.delete("/stocks/:id",checkAuth,InventoryController.deleteStock);

router.post("/purchaseBill",checkAuth,InventoryController.addPurchaseBill);

router.get("/purchaseBill",checkAuth,InventoryController.getPurchaseBill);

router.delete("/purchaseBill/:billNo",checkAuth,InventoryController.deletePurchaseBill);

router.post("/salesBill",checkAuth,InventoryController.addSalesBill);

router.get("/salesBill",checkAuth,InventoryController.getSalesBills);

router.get("/salesBill/:id",checkAuth,InventoryController.getSalesBill);

router.delete("/salesBill/:billNo",checkAuth,InventoryController.deleteSalesBill);

module.exports = router;