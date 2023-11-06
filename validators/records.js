const { check } = require("express-validator");
const validateResults = require("../utils/handleValidation");

const validatorCreateItems = [
    check("title").exists().notEmpty(),
    check("label").exists().notEmpty(),
    check("artist").exists().notEmpty(),
    check("categories").exists().notEmpty().isArray(),
    check("price").exists().notEmpty().isNumeric({ min: 0 }),
    check("year").exists().notEmpty(),
    check("stock").exists().notEmpty().isNumeric({ min: 0 }),
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