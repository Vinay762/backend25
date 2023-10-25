import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js'


const createOrder = asyncHandler(async(req, res) => {
    const {customer_id, quantity, product_id} = req.body;
    //if existing customer_id
    const order = await Order.findOne({customer_id});
    if(order){
        const norder_items = order.order_items;
        const outdatedTotalPrice = order.totalPrice;
        const product = await Product.findOne({_id: product_id});
        const additionalPrice = product.price * quantity;
        order.totalPrice = outdatedTotalPrice + additionalPrice;
        const newOrder = {quantity, product_id};
        norder_items.push(newOrder);
        order.order_items = norder_items;
        const updatedOrder = await order.save();
        res.status(201).json("Order Updated");
    }else{
        const product = await Product.findOne({_id: product_id});
        const totalPrice = product.price * quantity;
        const createdOrder = await Order.create({
            customer_id,
            totalPrice,
            order_items : [{quantity, product_id}],
        })
        if(createdOrder){
            res.status(201).json("New Order Created")
        }else{
            res.status(400);
            throw new Error("Error while creating")
        }
    }
})

const removeOrderByProductId = asyncHandler(async(req, res) => {
    const {product_id, customer_id} = req.body;
    const order = await Order.findOne({customer_id});
    if(order){
        const order_items = order.order_items;
        const updatedOrderItems = order_items.filter((eachOrder) => eachOrder.order_items.product != product_id);
        order.order_items = updatedOrderItems;
        const updatedOrder = await order.save();
        res.json("Order Updated Successfully");
    }else{
        res.status(400);
        res.json("Order does not existing or something like this error");
    }
})

const deleteOrder = asyncHandler(async(req, res) => {
    const _id = req._id;
    const deleteOrder = await Order.deleteOne({_id});
    if(deleteOrder){
        res.json("Sucessfully deleted");
    }else{
        res.status(400);
        throw new Error("Some Error while deleteing order");
    }
})

const getAverage = asyncHandler(async(req, res) => {
    const result = await Order.aggregate([
        {
          $group: {
            _id: null,
            averageTotalPrice: { $avg: '$totalPrice' },
          },
        },
      ]);
    if(result){
        if(result.length > 0){
            res.json(`Average Price is ${result[0].averageTotalPrice}`);
        }
    }else{
        throw new Error("Error while generating the average");
    }
});


// const getMax = asyncHandler(async(req, res) => {
//     const result = await Order.aggregate([
//         {
//             $group:{
//                 _id : "$order_items.product",
//             }
//         }
//     ])
// })

export {
    removeOrderByProductId,
    deleteOrder,
    createOrder,
    getAverage,
}