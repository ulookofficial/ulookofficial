import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    // Add to cart function
    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    // Delete from cart function
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="mt-10">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold text-gray-900">Bestselling Products</h1>
            </div>

            {/* Product Grid Section */}
            <section className="text-gray-600 body-font">
                {/* Main wrapper */}
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex justify-center">
                        {loading && <Loader />}
                    </div>
                    {/* Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            return (
                                <div key={index} className="relative p-4">
                                    <div className="h-full border border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
                                        {/* Product Image */}
                                        <div className="relative">
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="w-full h-80 object-cover cursor-pointer"
                                                src={productImageUrl}
                                                alt={title}
                                            />
                                            {/* Hover effect for image */}
                                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-50"></div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">uLOOK</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.length > 25 ? title.substring(0, 25) + '...' : title}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            {/* Cart Buttons */}
                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id)
                                                    ? (
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full font-semibold transition duration-300"
                                                            aria-label={`Remove ${title} from cart`}
                                                        >
                                                            Remove From Cart
                                                        </button>
                                                    )
                                                    : (
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg w-full font-semibold transition duration-300"
                                                            aria-label={`Add ${title} to cart`}
                                                        >
                                                            Add To Cart
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageProductCard;
