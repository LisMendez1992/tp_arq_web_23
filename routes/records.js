const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem , getRecordCategories } = require("../controllers/records");
const {validatorCreateItems, validatorGetItem} = require("../validators/records")
const router = express.Router();


router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/",validatorCreateItems, createItem);
router.put("/:id",validatorGetItem,validatorCreateItems, updateItem);
router.delete("/:id",validatorGetItem, deleteItem);
router.get("/:id/categories", getRecordCategories);

module.exports = router;