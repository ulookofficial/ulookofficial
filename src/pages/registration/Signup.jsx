import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const handleShowPassword = () => setShowPassword(!showPassword);

    // Password Strength Function (basic check for this example)
    const checkPasswordStrength = (password) => {
        const strength = password.length >= 8 ? "Strong" : password.length >= 5 ? "Medium" : "Weak";
        setPasswordStrength(strength);
    };

    const userSignupFunction = async () => {
        // Basic validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);

        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            }

            const userRefrence = collection(fireDB, "user");
            await addDoc(userRefrence, user);

            setUserSignup({ name: "", email: "", password: "" });

            toast.success("Signup Successfully");
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error("Signup Failed: " + error.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
            {loading && <Loader />}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-6">
                    <img src="logo.png" alt="Logo" className="w-24 mx-auto" />
                </div>

                {/* Heading */}
                <div className="text-center mb-6">
                    <h2 className='text-3xl font-bold text-pink-600'>
                        Signup
                    </h2>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                    />
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({ ...userSignup, password: e.target.value });
                            checkPasswordStrength(e.target.value);
                        }}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                    />
                    <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                {/* Password Strength */}
                <div className="mb-4">
                    <span className={`text-sm ${passwordStrength === "Strong" ? "text-green-600" : passwordStrength === "Medium" ? "text-yellow-500" : "text-red-500"}`}>
                        {passwordStrength ? `Password Strength: ${passwordStrength}` : ""}
                    </span>
                </div>

                {/* Terms Checkbox */}
                <div className="mb-4 flex items-center">
                    <input type="checkbox" id="terms" className="mr-2" />
                    <label htmlFor="terms" className="text-sm text-gray-600">I agree to the <Link to="/terms" className="text-pink-600 hover:underline">Terms and Conditions</Link></label>
                </div>

                {/* Signup Button */}
                <div className="mb-6">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md font-semibold'
                    >
                        Signup
                    </button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-sm">Already have an account? <Link to="/login" className="text-pink-600 font-bold">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
