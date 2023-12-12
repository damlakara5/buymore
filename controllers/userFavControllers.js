const UserFav = require("../models/userFavModel")

exports.getFavs = async(req,res) => {
    const userId = req.user._id

    if(!userId){
        res.status(401).json({
            status: "failed",
            message: 'The user belonging to this token does no longer exist.'
        })
    }

    const favs = await UserFav.find({ user: userId }).populate("product").select("-user -__v")

    console.log(favs)

    res.status(200).json({
        status: "success",
        data: favs
    })

}


exports.addFavs = async(req,res) => {
  try{
    const productId = req.params.id
    const userId = req.user._id

    const existingFavorite = await UserFav.findOne({ user: userId, product: productId });

    if(existingFavorite){
        await UserFav.deleteOne({ _id: existingFavorite._id });
        const allFavorites = await UserFav.find({ user: userId }).populate("product").select("-user -__v");


        return res.status(201).json({ 
            status: 'success', 
            message: 'Product has been removed from favorites',
            data: allFavorites 
        });
    }else {
        // If it's not favorited yet, add it to favorites
        const newFavorite = new UserFav({
            user: userId,
            product: productId
        });
        await newFavorite.save();
        const allFavorites = await UserFav.find({ user: userId }).populate("product").select("-user -__v");


        return res.status(200).json({ 
            status: 'success', 
            message: 'Product has been added to favorites',
            data: allFavorites
        });
    }
  }catch(e) {
    res.status(400).json({
        status: "failed",
        message: e
    })
  }

}

