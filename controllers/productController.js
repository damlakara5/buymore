const Product = require("../models/ProductModel")



exports.getAllProducts  = async(req,res) => {
    try{
        let query = {};
        let searchTerms = req.query.search;

        if (req.query.price) {
            // Convert price to a number if it's a string
            const priceValue = Number(req.query.price);

            // Use the $lte operator to find products with price <= priceValue
            query.price = { $lte: priceValue };
        }
        if (req.query.category){
            let categories = req.query.category;
            if (!Array.isArray(categories)) {
                categories = categories.split(','); // Assuming categories are comma-separated
            }
        
            // Use the $in operator to find products with categories
            query.category = { $in: categories };
        }
        if (req.query.size){
            let sizes = req.query.size;
            if (!Array.isArray(sizes)) {
                sizes = sizes.split(','); // Assuming sizes are comma-separated
            }
        
            // Use the $in operator to find products with sizes
            query.sizes = { $in: sizes };
        }

        if (req.query.brand){
        
            // Use the $in operator to find products with categories
            query.brand = req.query.brand
        }

        if(req.query.discount){
            query.discount = { $exists: true, $ne: null };
        }

        if (typeof searchTerms === 'string') {
            searchTerms = [searchTerms];
        }

        if(req.query.search) {
            query = {
                $or: searchTerms.map(term => ({
                    $or: [
                        { name: new RegExp(term, 'i') }, // case-insensitive partial match for name
                        { category: new RegExp(term, 'i') } // case-insensitive partial match for category
                    ]
                }))
            };
        }
        const products = await Product.find(query)

        res.status(200).json({
            status: "success",
            result: products.length,
            data: products
        })
    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            error: e
        })
    }
}

exports.getOneProduct =async(req,res) => {

    const product = await Product.findById(req.params.id)
                                .populate(
                                    {path: 'reviews',
                                    populate: {
                                        path: 'user',
                                        model: 'User'
                                    }})

    res.status(200).json({
        status: "success",
        data: product
    })
}  

exports.addProduct =async(req,res) => {

    const product = await Product.create(req.body)

    res.status(201).json({
        status: "success",
        data: product
    })
}  

