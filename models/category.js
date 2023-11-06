const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");


const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    } 
);
 
CategorySchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Category", CategorySchema);