import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


//get all the products
//no authentication is required 
//filtering is required
const getAllProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({});
    if(products){
        res.json(products);
    }else{
        res.status(400);
        throw new Error("Cannot Get all the Products");
    }
    
});


const addProduct = asyncHandler(async(req, res) => {
    const {name, price, description, category, rating} = req.body;
    //give all the value of that fileds
    if(!name){
        res.status(400);
        throw new Error("Name of Product is required")
    }

    if(!price){
        res.status(400);
        throw new Error("Price of Product is required")
    }

    if(!description){
        res.status(400);
        throw new Error("Description of Product is required")
    }

    if(!category){
        res.status(400);
        throw new Error("Description of Product is required")
    }

    if(!rating){
        res.status(400);
        throw new Error("Rating of Product is required")
    }

    const product = Product.create({
        name, 
        price,
        description,
        category,
        rating
    })

    if(product){
        res.status(201).json(product);
    }else{
        res.status(400);
        throw new Error("Invalid Product Data");
    }

})

const deleteProduct = asyncHandler(async(req,res) => {
    const _id = req.body._id;
    const deletedProduct = await Product.deleteOne({_id})
    if(deleteProduct){
        res.json("Product Deleted Successfully");
    }else{
        res.status(400);
        throw new Error("Invalid user id");
    }
})

export{
    getAllProducts,
    addProduct,
    deleteProduct
}