import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Use icons for actions

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const navigate = useNavigate();

    // Delete product 
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully');
            getAllProductFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Error deleting product');
            setLoading(false);
        }
    };

    return (
        <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                {/* Title and Add Product Button */}
                <h1 className="text-2xl text-pink-500 font-semibold">All Products</h1>
                <Link to={'/addproduct'}>
                    <button className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition duration-300">
                        Add Product
                    </button>
                </Link>
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center">
                {loading && <Loader />}
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-pink-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-pink-100 text-pink-500">
                        <tr>
                            <th className="h-12 px-4 text-md font-semibold">S.No.</th>
                            <th className="h-12 px-4 text-md font-semibold">Image</th>
                            <th className="h-12 px-4 text-md font-semibold">Title</th>
                            <th className="h-12 px-4 text-md font-semibold">Price</th>
                            <th className="h-12 px-4 text-md font-semibold">Category</th>
                            <th className="h-12 px-4 text-md font-semibold">Date</th>
                            <th className="h-12 px-4 text-md font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-pink-600">
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item;
                            return (
                                <tr key={index} className="hover:bg-pink-50 transition-all duration-200">
                                    <td className="h-12 px-4">{index + 1}</td>
                                    <td className="h-12 px-4">
                                        <img className="w-20 h-20 object-cover rounded-lg shadow-md" src={productImageUrl} alt={title} />
                                    </td>
                                    <td className="h-12 px-4">{title}</td>
                                    <td className="h-12 px-4">₹{price}</td>
                                    <td className="h-12 px-4">{category}</td>
                                    <td className="h-12 px-4">{date}</td>
                                    <td className="h-12 px-4 flex items-center gap-4">
                                        {/* Edit Button */}
                                        <button 
                                            onClick={() => navigate(`/updateproduct/${id}`)} 
                                            className="text-green-500 hover:text-green-600 transition duration-300">
                                            <FaEdit size={20} />
                                        </button>
                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => deleteProduct(id)} 
                                            className="text-red-500 hover:text-red-600 transition duration-300">
                                            <FaTrash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductDetail;
