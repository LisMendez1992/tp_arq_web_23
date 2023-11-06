const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/orders");
const {validatorCreateItems, validatorGetItem} = require("../validators/orders")
const router = express.Router();


router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/",validatorCreateItems, createItem);
router.put("/:id",validatorGetItem,validatorCreateItems, updateItem);
router.delete("/:id",validatorGetItem, deleteItem);


module.exports = router;