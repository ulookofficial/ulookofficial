import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'; // Assuming you have a cartSlice for Redux
import toast from 'react-hot-toast';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Navigate } from 'react-router-dom';
import BuyNowModal from '../../components/buyNowModal/BuyNowModal';

const CombosPage = () => {
    const dispatch = useDispatch();
    const [gender, setGender] = useState(''); // Gender selected by user
    const [shirt, setShirt] = useState('');
    const [pants, setPants] = useState('');
    const [footwear, setFootwear] = useState('');
    const [accessories, setAccessories] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const cartItems = useSelector((state) => state.cart);
    
    const menProducts = useSelector((state) => state.products.men);
    const womenProducts = useSelector((state) => state.products.women);

    const user = JSON.parse(localStorage.getItem('users'));  // Get user from localStorage

    // Function to handle gender change
    const handleGenderChange = (e) => {
        setGender(e.target.value);
        setTotalPrice(e.target.value === 'male' ? 1800 : 2500);
        resetSelections();
    };

    const resetSelections = () => {
        setShirt('');
        setPants('');
        setFootwear('');
        setAccessories('');
    };

    const filteredShirts = gender === 'male' ? menProducts.filter(p => p.category === 'shirt') : womenProducts.filter(p => p.category === 'shirt');
    const filteredPants = gender === 'male' ? menProducts.filter(p => p.category === 'pants') : womenProducts.filter(p => p.category === 'pants');
    const filteredFootwear = gender === 'male' ? menProducts.filter(p => p.category === 'footwear') : womenProducts.filter(p => p.category === 'footwear');
    const filteredAccessories = gender === 'male' ? menProducts.filter(p => p.category === 'accessories') : womenProducts.filter(p => p.category === 'accessories');

    // Function to add the combo to the cart
    const handleAddToCart = () => {
        if (!shirt || !pants || !footwear || !accessories) {
            toast.error('Please select all items');
            return;
        }

        const selectedCombo = {
            gender,
            shirt,
            pants,
            footwear,
            accessories,
            totalPrice,
        };

        dispatch(addToCart(selectedCombo));
        toast.success('Combo added to cart!');
    };

    // Order summary and buy now function
    const [addressInfo, setAddressInfo] = useState({
        name: '',
        address: '',
        pincode: '',
        mobileNumber: '',
        time: Timestamp.now(),
        date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    });

    const buyNowFunction = () => {
        if (addressInfo.name === '' || addressInfo.address === '' || addressInfo.pincode === '' || addressInfo.mobileNumber === '') {
            return toast.error("All Fields are required");
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: 'confirmed',
            time: Timestamp.now(),
            date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        };

        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({ name: '', address: '', pincode: '', mobileNumber: '' });
            toast.success("Order Placed Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="py-8">
            <h1 className="text-center text-3xl font-semibold mb-5">Choose Your Combo</h1>

            {/* Gender Selection */}
            <div className="flex justify-center mb-5">
                <select onChange={handleGenderChange} className="border p-2 rounded-lg">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            {/* Combo Product Selection */}
            {gender && (
                <div className="flex flex-wrap justify-center space-x-6">
                    <div className="w-1/4">
                        <label className="block text-center font-medium mb-2">Shirts</label>
                        <select value={shirt} onChange={(e) => setShirt(e.target.value)} className="w-full border p-2 rounded-lg">
                            <option value="">Select Shirt</option>
                            {filteredShirts.map((item) => (
                                <option key={item.id} value={item.id}>{item.title} - ₹{item.price}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/4">
                        <label className="block text-center font-medium mb-2">Pants</label>
                        <select value={pants} onChange={(e) => setPants(e.target.value)} className="w-full border p-2 rounded-lg">
                            <option value="">Select Pants</option>
                            {filteredPants.map((item) => (
                                <option key={item.id} value={item.id}>{item.title} - ₹{item.price}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/4">
                        <label className="block text-center font-medium mb-2">Footwear</label>
                        <select value={footwear} onChange={(e) => setFootwear(e.target.value)} className="w-full border p-2 rounded-lg">
                            <option value="">Select Footwear</option>
                            {filteredFootwear.map((item) => (
                                <option key={item.id} value={item.id}>{item.title} - ₹{item.price}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/4">
                        <label className="block text-center font-medium mb-2">Accessories</label>
                        <select value={accessories} onChange={(e) => setAccessories(e.target.value)} className="w-full border p-2 rounded-lg">
                            <option value="">Select Accessories</option>
                            {filteredAccessories.map((item) => (
                                <option key={item.id} value={item.id}>{item.title} - ₹{item.price}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Total Price */}
            <div className="text-center mt-5">
                <h2 className="text-xl font-semibold">Total Price: ₹{totalPrice}</h2>
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-center mt-6">
                <button onClick={handleAddToCart} className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg font-bold">
                    Add to Cart
                </button>
            </div>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold">Cart Summary</h2>
                    <div className="flex justify-between">
                        <span>Total Items: {cartItems.length}</span>
                        <span>Total Amount: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                    </div>

                    <div className="mt-4">
                        {user ? (
                            <BuyNowModal
                                addressInfo={addressInfo}
                                setAddressInfo={setAddressInfo}
                                buyNowFunction={buyNowFunction}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CombosPage
