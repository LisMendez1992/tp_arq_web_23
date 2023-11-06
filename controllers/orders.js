const { orderModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { recordModel } = require('../models');
const { matchedData } = require('express-validator');


const getItems = async (req, res) => {
    try {
        const data = await orderModel.find({})
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
};

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await orderModel.findById(id)
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_RECORD")
    }
};

const createItem = async (req, res) => {
    try {
        const { client_name, record_items } = req.body;
        let totalPrice = 0;
        const recordUpdatePromises = [];

        for (const item of record_items) {
            const record = await recordModel.findById(item.record_id);

            if (record) {
                if (record.stock >= item.quantity) {
                    const recordPrice = record.price * item.quantity;
                    totalPrice += recordPrice;

                    const updatedStock = record.stock - item.quantity;
                    recordUpdatePromises.push(
                        recordModel.findByIdAndUpdate(item.record_id, { stock: updatedStock })
                    );
                } else {
                    return handleHttpError(res, "INSUFFICIENT_STOCK");
                }
            } else {
                return handleHttpError(res, "RECORD_NOT_FOUND");
            }
        }

        await Promise.all(recordUpdatePromises);

        const newOrder = {
            client_name,
            record_items,
            total_price: totalPrice,
        };

        const data = await orderModel.create(newOrder);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};




const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await orderModel.findByIdAndUpdate(
            id, body, { new: true }
        );
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_RECORD")
    }
};


const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResponse = await orderModel.delete({ _id: id });
        const data = {
            deleted: deleteResponse.matchedCount
        }
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }