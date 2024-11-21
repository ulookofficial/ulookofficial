// uLOOK official - Rights Reserved 2024

import { useContext, useState } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;

    // State for sorting, search, and pagination
    const [isSerialAscending, setIsSerialAscending] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of rows per page

    // Handle sorting by serial number
    const handleSerialSort = () => {
        setIsSerialAscending(!isSerialAscending);
    };

    // Filter orders based on search query
    const filteredOrders = getAllOrder.filter(order => {
        const searchLower = searchQuery.toLowerCase();
        return (
            order.id.toString().includes(searchLower) ||
            order.addressInfo.name.toLowerCase().includes(searchLower) ||
            order.email.toLowerCase().includes(searchLower) ||
            order.status.toLowerCase().includes(searchLower)
        );
    });

    // Sort filtered orders based on serial number
    const sortedOrders = isSerialAscending
        ? [...filteredOrders]
        : [...filteredOrders].reverse();

    // Paginate orders
    const paginatedOrders = sortedOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div>
            <div className="py-5">
                <h1 className="text-xl text-pink-300 font-bold">All Orders</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by Order ID, Name, Email, or Status..."
                    className="w-full p-2 mb-4 border rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Orders Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <thead>
                        <tr>
                            <th
                                onClick={handleSerialSort}
                                className="cursor-pointer h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">
                                S.No. {isSerialAscending ? "↑" : "↓"}
                            </th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Order ID</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Image</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Title</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Category</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Quantity</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Total Price</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Status</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Name</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Address</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Pincode</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Phone Number</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Email</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Date</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order, index) => (
                            order.cartItems.map((item, idx) => (
                                <tr key={`${order.id}-${idx}`} className="text-pink-300">
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">
                                        {isSerialAscending
                                            ? index + 1 + (currentPage - 1) * itemsPerPage
                                            : sortedOrders.length - (index + (currentPage - 1) * itemsPerPage)}
                                    </td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{order.id}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">
                                        <img src={item.productImageUrl} alt="img" className="w-12 h-12" />
                                    </td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{item.title}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{item.category}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">₹{item.price}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{item.quantity}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">₹{item.price * item.quantity}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100 text-green-600">{order.status}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.name}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.address}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.pincode}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.mobileNumber}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{order.email}</td>
                                    <td className="h-12 px-6 border-t border-l first:border-l-0 border-pink-100">{order.date}</td>
                                    <td
                                        onClick={() => orderDelete(order.id)}
                                        className="h-12 px-6 text-red-500 cursor-pointer border-t border-l first:border-l-0 border-pink-100">
                                        Delete
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Previous
                </button>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default OrderDetail;
