import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Login State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    /**========================================================================
     *                          User Login Function 
    *========================================================================**/
    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            
            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) );
                    setUserLogin({
                        email: "",
                        password: ""
                    });
                    toast.success("Login Successfully");
                    setLoading(false);
                    if(user.role === "user") {
                        navigate('/');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-pink-400 via-pink-500 to-purple-600'>
            {loading && <Loader />}
            {/* Login Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img src="logo.png" alt="Logo" className="w-20" />
                </div>

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h2 className='text-3xl font-bold text-pink-600'>
                        Login
                    </h2>
                </div>

                {/* Input Fields */}
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400'
                    />
                </div>

                <div className="mb-6 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400'
                    />
                    <button 
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                {/* Login Button */}
                <div className="mb-4">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md font-semibold'
                    >
                        Login
                    </button>
                </div>

                {/* Forgot Password */}
                <div className="text-center mb-4">
                    <Link className='text-sm text-pink-500 hover:underline' to="/reset-password">Forgot Password?</Link>
                </div>

                {/* Signup Link */}
                <div className="text-center">
                    <p className="text-sm">Don't have an account? <Link className='text-pink-500 font-bold' to={'/signup'}>Signup</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
