const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete");


const RecordSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        label: {
            type: String

        },
        artist: {
            type: String

        },
        categories: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Category", 
            },
          ],
        price: {
            type: Number

        },
        year:
        {
            type: String
        },
        stock:
        {
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

RecordSchema.statics.findAllData = function () {
    return this.find().populate("categories")
  };

  RecordSchema.statics.findOneData = function (id) {
    return this.findById(id).populate("categories");

  };
  
  


RecordSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Record", RecordSchema);
