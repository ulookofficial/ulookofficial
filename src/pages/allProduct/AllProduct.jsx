import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState({
        category: '',
    });
    const [sortOption, setSortOption] = useState('priceLowToHigh');

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Filter and sort products
    const filteredProducts = getAllProduct
        .filter((item) => filter.category === '' || item.category === filter.category)
        .sort((a, b) => {
            switch (sortOption) {
                case 'priceLowToHigh':
                    return a.price - b.price;
                case 'priceHighToLow':
                    return b.price - a.price;
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div>
                    <h1 className="text-center mb-5 text-3xl font-semibold">All Products</h1>
                </div>

                {/* Filters and Sorting */}
                <div className="flex justify-between mb-5">
                    <div className="flex space-x-4">
                        {/* Filter by Category with left padding */}
                        <select
                            name="category"
                            onChange={handleFilterChange}
                            className="border p-2 rounded-lg pl-4"
                        >
                            <option value="">All Categories</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="combos">Combos</option>
                            <option value="children">Children</option>
                            <option value="inners">Inners</option>
                            <option value="footwear">Footwear</option>
                            <option value="watches">Watches</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>

                    {/* Sorting Options with right padding */}
                    <select
                        onChange={handleSortChange}
                        className="border p-2 rounded-lg pr-4"
                    >
                        <option value="priceLowToHigh">Price Low to High</option>
                        <option value="priceHighToLow">Price High to Low</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>

                {/* Product Cards */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>

                        <div className="flex flex-wrap -m-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((item, index) => {
                                    const { id, title, price, productImageUrl } = item;
                                    return (
                                        <div key={index} className="p-4 w-full">
                                            <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transform transition-all duration-300">
                                                <div className="pr-image-ctn overflow-hidden">
                                                    <img
                                                        onClick={() => navigate(`/productinfo/${id}`)}
                                                        className="lg:h-80 h-96 w-full object-cover"
                                                        src={productImageUrl}
                                                        alt={title}
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                        uLook
                                                    </h2>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                        {title.substring(0, 25)}
                                                    </h1>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                        ₹{price}
                                                    </h1>
                                                    <div className="flex justify-center space-x-2">
                                                        {cartItems.some((p) => p.id === item.id) ? (
                                                            <button
                                                                onClick={() => deleteCart(item)}
                                                                className="bg-red-700 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-bold w-full"
                                                            >
                                                                Remove from Cart
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => addCart(item)}
                                                                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-bold w-full"
                                                            >
                                                                Add to Cart
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-center text-lg font-medium">No products found</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
