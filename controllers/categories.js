const { categoryModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');


const getItems = async (req, res) => {
    try {
        const data = await categoryModel.find({})
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
};

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        console.log(id)
        const data = await categoryModel.findById(id)
        res.send({ data })
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_GET_RECORD")
    }

 };

const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await categoryModel.create(body)
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_CREATE_ITEMS")
    }
};


const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await categoryModel.findByIdAndUpdate(
            id, body, { new: true }
        );
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_UPDATE_RECORD")
    }
 };


const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const deleteResponse = await categoryModel.delete({ _id: id });
        const data = {
            deleted: deleteResponse.matchedCount
        }
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
 };

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }