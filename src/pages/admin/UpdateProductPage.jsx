import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'men' },
    { name: 'women' },
    { name: 'combo' },
    { name: 'children' },
    { name: 'inners' },
    { name: 'footwear' },
    { name: 'watches' },
    { name: 'accessories' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-IN", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const getSingleProductFunction = async () => {
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                time: product?.time,
                date: product?.date
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product Updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            toast.error("Error updating product");
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50">
            {loading && <Loader />}
            {/* Form Container */}
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

                {/* Heading */}
                <h2 className="text-center text-2xl font-bold text-pink-500 mb-6">
                    Update Product
                </h2>

                {/* Form Inputs */}
                <form>
                    {/* Product Title */}
                    <div className="mb-5">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder="Product Title"
                            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
                        />
                    </div>

                    {/* Product Price */}
                    <div className="mb-5">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder="Product Price"
                            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
                        />
                    </div>

                    {/* Product Image URL */}
                    <div className="mb-5">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                            placeholder="Product Image URL"
                            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="mb-5">
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
                        >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Colour */}
                    <div className="mb-5">
                        <input
                            type="text"
                            name="colur"
                            value={product.colur}
                            onChange={(e) => setProduct({ ...product, colur: e.target.value })}
                            placeholder="Colour"
                            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
                        />
                    </div>

                    {/* Product Description */}
                    <div className="mb-5">
                        <input
                            type="text"
                            name="size"
                            value={product.size}
                            onChange={(e) => setProduct({ ...product, size: e.target.value })}
                            placeholder="Size"
                            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
                        />
                    </div>

                    {/* Product Description */}
                    <div className="mb-5">
                        <textarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            placeholder="Product Description"
                            rows="4"
                            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
                        />
                    </div>

                    {/* Update Button */}
                    <div className="mb-5">
                        <button
                            onClick={updateProduct}
                            type="button"
                            className="w-full py-3 bg-pink-500 text-white font-bold rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductPage;
