
const ShoppingCart = require("../models/ShoppingCartModel")
const stripe = require("stripe")("sk_test_51OEvhyG2sIVA1ynF1lroMBPMxG4nAIwsZ0XtR9upB9atqodtkWSCzCVr6TEnNbEBYFuBp0gVeKnT8XjEbKZu0B0o00gGNFy7Mv")
const Order = require("../models/OrdersModel")

exports.getCheckoutSession = async(req,res,next) => {
    //Get the currently booked tour
    try{
        const order = await ShoppingCart.findById(req.params.id)
        const price =  Number(req.body.total)
        //create checkout session
        
        const session = await stripe.checkout.sessions.create({
            //info about the session
            payment_method_types: ["card"],
            success_url : `http://localhost:3000/order/?order=${req.params.id}&user=${req.user.id}&price=${price}`,
            cancel_url : `${req.protocol}://${req.get("host")}/`,
            customer_email: req.user.email,
            client_reference_id: req.params.id,
            //info about the products
            line_items : [{
                price_data: {
                    unit_amount: price * 100,
                    currency: 'usd',
                    product_data : {
                        name: `BuyMore`,
        
                    }
                }, //convert to cents
                quantity: 1,
        
            }],
            mode: "payment"
        })
        
            //Send to client
            res.status(200).json({
                status: 'success',
                session: session.id  // Send only the session ID, not the whole session object
            });

    }catch(e) {
        console.log(e)
        res.status(400).json({
            status :"failed",
            message :e
        })
    }
   
}



    exports.createPaymentCheckout = async (req, res, next) => {
        // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
        let cart;
        const { order, user, price } = req.query;
        if (!order && !user ) return next();

        try {
            cart = await ShoppingCart.findById(order).populate("items.product");

            if (!cart) {
                throw new Error('Cart not found');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            // Handle the error appropriately
            return; // Exit the function if an error occurs
        }

        const products = cart.items;
        
        
        if (!order) {
            console.error('Order ID is missing or invalid');
            // Handle the missing or invalid order ID
            return;
        }
        
       await Order.create({ products, user, totalAmount: price});
       await ShoppingCart.deleteMany({})
      
        res.redirect("http://127.0.0.1:5173/profile/orders");
      };


    exports.getRefund =  async (req, res) => {
        try {
            const refundId = req.params.refundId;
            console.log(refundId)
            const refund = await stripe.refunds.retrieve(refundId);
            res.json(refund);
        } catch (error) {
            res.status(400).send('Error fetching refund details: ' + error.message);
        }
    }