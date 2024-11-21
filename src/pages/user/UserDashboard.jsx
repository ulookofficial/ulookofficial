import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                {/* Profile Section with Dark Theme */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-8 text-white">
                    <div className="flex justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                            alt="User Profile"
                            className="w-20 h-20 rounded-full border-4 border-indigo-600 shadow-md"
                        />
                    </div>
                    <div className="text-center mt-4">
                        <h1 className="text-2xl font-bold text-indigo-400">{user?.name}</h1>
                        <p className="text-gray-300">{user?.email}</p>
                        <p className="text-sm text-gray-500">{user?.date}</p>
                        <p className="text-sm text-gray-500">{user?.role}</p>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="orders-section">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Your Orders</h2>

                    {/* Loader */}
                    <div className="flex justify-center mt-4">{loading && <Loader />}</div>

                    {/* Order List */}
                    {getAllOrder.filter(order => order.userid === user?.uid).map((order, index) => (
                        <div key={index} className="order-card bg-white shadow-lg rounded-xl overflow-hidden mb-6">
                            <div className="flex justify-between items-center bg-pink-50 p-4 border-b border-pink-100">
                                <div className="flex items-center">
                                    <span className="font-semibold text-lg">Order #{order.cartItems[0]?.id}</span>
                                    <span className={`ml-4 px-2 py-1 rounded-full text-sm font-medium ${order.status === 'pending' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">Total: ₹{order.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                            </div>

                            {/* Order Items */}
                            {order.cartItems.map((item, itemIndex) => {
                                const { id, date, quantity, price, title, productImageUrl, category } = item;
                                return (
                                    <div key={itemIndex} className="flex p-4 border-b border-pink-100 hover:bg-pink-50 cursor-pointer">
                                        <div className="w-1/4">
                                            <img className="w-full h-40 object-cover rounded-lg" src={productImageUrl} alt={title} />
                                        </div>
                                        <div className="w-3/4 pl-4">
                                            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                                            <p className="text-sm text-gray-600">{category}</p>
                                            <p className="mt-2 text-sm text-gray-500">x{quantity}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-end ml-auto">
                                            <p className="text-lg font-semibold text-gray-900">₹{price}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {/* No Orders Message */}
                    {getAllOrder.filter(order => order.userid === user?.uid).length === 0 && (
                        <div className="text-center text-gray-500 mt-4">
                            You have no orders yet.
                        </div>
                    )}
                </div>

                {/* Back to Top Button */}
                <div className="fixed bottom-6 right-6">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition"
                    >
                        ↑
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
