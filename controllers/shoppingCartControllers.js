
const ShoppingCart = require("../models/ShoppingCartModel")


exports.getCart = async (req,res) => {
    try{
        const userId = req.user._id
        const cart = await ShoppingCart.find({user: userId}).populate("items.product").select("-user")

        const data = cart.length === 0 ? {items: []} : cart[0]

        res.status(200).json({
            status: "success",
            data
        })
    }catch(e){
        console.log(e, "hey")
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}
exports.addToCart = async (req,res,next) => {
    try{
        const userId = req.user._id
        const { product, quantity, size, color } = req.body;
        const productId = product._id;


        // Fetch the existing cart or create a new one
        let cart = await ShoppingCart.findOne({ user: userId });
        if (cart) {
            // Check if the product already exists in the cart
           
            const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId && item.size === size && item.color === color);
          
      
            if (existingItemIndex > -1) {
              // Update quantity if product exists
              cart.items[existingItemIndex].quantity += quantity;
            } else {
              // Add new item if product doesn't exist
              cart.items.push({ product: productId, quantity, size,color });
            }
          }else{

            cart = await ShoppingCart.create({ 
                user: userId, 
                items: [{ product: productId, quantity, size, color }] }).then(cart => {
                    // After creating the cart, use findById to retrieve it and populate the necessary fields
                    return ShoppingCart.findById(cart._id).populate("items.product");
                })
        }
        await cart.save();

        res.status(200).json({
            status: "success",
            data: cart
        })
    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}


exports.deleteFromCart = async(req,res) => {
    try{
        const userId = req.user._id
        const { product, quantity } = req.body;
        const productId = product._id;

        const cart= await ShoppingCart.findOne({user: userId})

        if (cart) {
            // Check if the product already exists in the cart
           
           
            const existingItem = cart.items.findIndex(item => item.product.toString() === productId);
            if (existingItem > -1) {
                cart.items.splice(existingItem, 1);
            } 
            // else, if product doesn't exist and quantity is 0 or less, do nothing
        
            await cart.save(); // Save the updated cart
            const products = await ShoppingCart.findOne({user: userId}).populate("items.product").select("-user")

            res.status(201).json({
                status: "success",
                message:"Deleted successfully",
                data: products
            })
        }
       
    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}