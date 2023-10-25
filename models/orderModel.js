import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    customer_id:{
        type : String,
        required : true,
        unique : true,
    },
    totalPrice:{
        type : Number,
    },
    order_items:[
        {
            quantity : {
                type : Number,
                required : true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
        }
    ]
},{
    timestamps : true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;