const { matchedData } = require('express-validator');
const { recordModel } = require('../models');
const { handleHttpError } = require('../utils/handleError')

const getItems = async (req, res) => {
    const { min_price, max_price, before_year, after_year, min_stock, max_stock, label, sort_field, sort_order } = req.query;

    try {
        const filter = {};
        if (max_price && !isNaN(max_price)) {
            filter['price.$lte'] = parseFloat(max_price);
        }
        if (min_price && !isNaN(min_price)) {
            filter['price.$gte'] = parseFloat(min_price);
        }
        if (max_stock && !isNaN(max_stock)) {
            filter['stock.$lte'] = parseInt(max_stock);
        }
        if (min_stock && !isNaN(min_stock)) {
            filter['stock.$gte'] = parseInt(min_stock);
        }
        if (before_year) {
            filter['year.$lte'] = parseInt(before_year);
        }
        if (after_year) {
            filter['year.$gte'] = parseInt(after_year);
        }
        if (label) {
            filter['label'] = label;
        }

        const sort = {};
        if (sort_field && sort_order) {
            sort[sort_field] = sort_order === 'asc' ? 1 : -1;
        }

        const filteredData = await recordModel.find(filter).populate("categories").sort(sort).exec();
        res.send({ data: filteredData });
    } catch (e) {
        console.error('Error al realizar la consulta:', e);
        handleHttpError(res, "ERROR_GET_RECORDS");
    }
}



const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await recordModel.findById(id).populate("categories");
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_RECORD")
    }
};

const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await recordModel.create(body)
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_RECORD")
    }
};


const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await recordModel.findByIdAndUpdate(
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
        const deleteResponse = await recordModel.delete({ _id: id });
        const data = {
            deleted: deleteResponse.matchedCount
        }
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};

const getRecordCategories = async (req, res) => {
    try {
      const id = req.params.id;
        const record = await recordModel
        .findById(id)
        .populate('categories')
        .exec();
  
      if (!record) {
        return handleHttpError(res, "RECORD_NOT_FOUND");
      }
  
      const categories = record.categories;
      res.send({ categories });
    } catch (e) {
      handleHttpError(res, "ERROR_GET_RECORDS_CATEGORIES");
    }
  };
  

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getRecordCategories }