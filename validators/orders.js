const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateItems = [
    check("client_name").exists().notEmpty(),
    check("record_items").exists().notEmpty().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]


module.exports = { validatorCreateItems, validatorGetItem };