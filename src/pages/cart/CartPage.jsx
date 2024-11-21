import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart");
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
    const cartTotal = cartItems.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // user
    const user = JSON.parse(localStorage.getItem('users'));

    // Buy Now Function
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });

    const buyNowFunction = () => {
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("Please fill all the fields.");
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
        };
        try {
            const orderRef = collection(fireDB, 'orders');
            addDoc(orderRef, orderInfo);
            setAddressInfo({ name: "", address: "", pincode: "", mobileNumber: "" });
            toast.success("Order placed successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">

                        {/* Cart Items Section */}
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8 shadow-lg">
                            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.length > 0 ?
                                    cartItems.map((item, index) => {
                                        const { id, title, price, productImageUrl, quantity, category } = item;
                                        return (
                                            <div key={index} className="flex items-center py-6">
                                                {/* Product Image */}
                                                <div className="flex-shrink-0">
                                                    <img src={productImageUrl} alt="product" className="h-24 w-24 rounded-md object-contain" />
                                                </div>

                                                {/* Product Details */}
                                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                                                        <p className="text-sm text-gray-500">{category}</p>
                                                    </div>
                                                    <div className="mt-1 flex items-end justify-between">
                                                        <p className="text-sm font-medium text-gray-900">₹{price}</p>
                                                        <div className="flex items-center">
                                                            <button onClick={() => handleDecrement(id)} className="h-8 w-8 bg-gray-300 rounded-full text-gray-800">-</button>
                                                            <input type="text" className="mx-2 w-10 text-center rounded-md border" value={quantity} readOnly />
                                                            <button onClick={() => handleIncrement(id)} className="h-8 w-8 bg-gray-300 rounded-full text-gray-800">+</button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <button onClick={() => deleteCart(item)} className="text-red-600 flex items-center">
                                                            <Trash size={16} className="mr-2" />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    :
                                    <div className="text-center py-8 text-gray-500">Your cart is empty. Start shopping!</div>
                                }
                            </ul>
                        </section>

                        {/* Order Summary Section */}
                        <section aria-labelledby="summary-heading" className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 shadow-lg">
                            <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900">Price Details</h2>
                            <div className="px-4 py-4">
                                <dl className="space-y-4">
                                    <div className="flex justify-between text-sm text-gray-800">
                                        <dt>Price ({cartItemTotal} items)</dt>
                                        <dd className="font-medium text-gray-900">₹{cartTotal}</dd>
                                    </div>
                                    <div className="flex justify-between py-4 text-sm text-gray-800">
                                        <dt>Delivery Charges</dt>
                                        <dd className="font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex justify-between py-4 border-t border-gray-200 text-base font-medium text-gray-900">
                                        <dt>Total Amount</dt>
                                        <dd>₹{cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="mt-6 px-4">
                                    {user ? (
                                        <BuyNowModal
                                            addressInfo={addressInfo}
                                            setAddressInfo={setAddressInfo}
                                            buyNowFunction={buyNowFunction}
                                        />
                                    ) : (
                                        <Navigate to='/login' />
                                    )}
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
