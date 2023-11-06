const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");




const OrderSchema = new mongoose.Schema(
    {
        client_name: {
            type: String
        },
        record_items: [
            {
                record_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
                quantity: { type: Number },
            },
        ],
        total_price: {
            type: Number
        },

    },
    {
        timestamps: true,
        versionKey: false
    }
);


OrderSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("Order", OrderSchema);