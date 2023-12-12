import { useSelector } from "react-redux"
import { BsStarFill ,BsStar} from "react-icons/bs";
import React from "react";
import { formatDate } from "../utils/formatDate";

function Reviews() {
    const product = useSelector(state => state.products.product)

  

    return (
        <div className="border-2 p-5 rounded-md  my-10 col-span-2 flex-col gap-5 flex " >
            <p className="text-start font-extrabold text-3xl">Product Reviews</p>
            { product.reviews.length !== 0 && <div className="flex items-center border-b-2 pb-5">
                <p className="font-extrabold text-3xl me-5"> {product.ratingsAverage}</p>
            {[1, 2, 3, 4, 5].map(star => (
                                    star <= product.ratingsAverage ? 
                                    <BsStarFill className="text-xl text-yellow-500" key={star} /> : 
                                    <BsStar className="text-xl" key={star} />
                                ))}
              <p className="ms-20 text-slate-500"> {product.ratingsQuantity} Review</p>
            </div>}
            {
                product.reviews.length === 0 && 
                <div className="flex flex-col items-center">
                    <BsStarFill className="text-xl mb-4 text-yellow-500" />
                    <p>No comments yet.</p>
                </div>
            }
            {
                product.reviews.map(review => (
                    <React.Fragment key={review._id}>
                        <div className="review-container ">
                            <div className="flex ">
                                {[1, 2, 3, 4, 5].map(star => (
                                    star <= review.rating ? 
                                    <BsStarFill className="text-xl text-yellow-500" key={star} /> : 
                                    <BsStar className="text-xl" key={star} />
                                ))}
                                <div className="ms-10"> {review.review} </div>
                            </div>
                            <div className="flex gap-3 text-slate-500 mt-2">
                               <p>{review.user.name.firstName} {review.user.name}</p> 
                                <p>|</p>
                                <p>  {formatDate(review.createdAt)} </p>
                            </div>
                        </div>
                    </React.Fragment>
                ))
                
            }
        </div>
    )
}

export default Reviews
