import { Fragment, useContext, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OpenContext } from '../context/OrderModalContext';
import Star from './Star';
import { useDispatch } from 'react-redux';
import { addReview } from '../store/reviewSlice';

export default function Modal() {
    const { open, setOpen , reviewProduct} = useContext(OpenContext);
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState()
    const dispatch = useDispatch()

  const cancelButtonRef = useRef(null)

  const handleSendReview = () => {

    dispatch(addReview({id: reviewProduct.product._id, rating, review}))

  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                  
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-base pb-3 font-semibold leading-6 border-b-2 mb-8 text-gray-900 w-full">
                      How Did You Find the Product?
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className='flex gap-5'>
                            <img className='w-20 h-32' src={reviewProduct?.product.images[0]} />
                            <div>
                                <p className='font-bold'> {reviewProduct?.product.brand} </p>
                                <p className=''> {reviewProduct?.product.name} </p>
                            </div>
                        </div>
                        <p className='me-5 font-bold mt-5'>Rate the product</p>
                        <div className="reviews__rating flex items-center mt-1 mb-4" role='button'> 
                                {
                                        [1,2,3,4,5].map((item) =>
                                        <Star
                                        key={item}
                                        filled={item < (hover || rating)}
                                        onMouseEnter={() => setHover(item + 1)}
                                        onMouseLeave={() => setHover(rating)}
                                        onClick={() => setRating(item + 1)}
                                        />
                                    )
                                    }
                                    
                                
                            </div>
                            <p className='font-bold text-base'>Review</p>
                            <textarea onChange={(e) => setReview(e.target.value)} placeholder='Your review' className='border-2 mt-2 rounded-md p-2 w-full' />

                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                    onClick={handleSendReview}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
