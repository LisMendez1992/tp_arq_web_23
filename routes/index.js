const express = require("express");
const fs = require("fs");
const router = express.Router();
const removeExtension = require('../utils/removeExtension');


const PATH_ROUTES =__dirname;


fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension.removeExtension(file);
    if(name !== 'index'){
        console.log(`CARGANDO RUTA ${name}`)
        router.use(`/${name}`,require(`./${file}`))
    }
});


module.exports = router;