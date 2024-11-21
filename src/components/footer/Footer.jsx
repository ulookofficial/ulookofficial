import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* main footer container */}
            <div className="container px-5 py-12 mx-auto flex flex-col items-center sm:flex-row justify-between border-t-2 border-gray-700">

                {/* Logo and Brand Name */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-start text-center sm:text-left">
                    <span className="text-3xl font-bold text-pink-500">uLOOK</span>
                    <p className="text-sm text-gray-400 sm:ml-4 sm:mt-0 mt-4">
                        © 2024 uLOOK —
                        <Link to="/" className="text-pink-500 ml-1 hover:text-white transition duration-300" rel="noopener noreferrer" target="_blank">
                            @ulook
                        </Link>
                    </p>
                </div>

                {/* Social Media Icons */}
                <div className="mt-4 sm:mt-0 flex justify-center sm:justify-start">
                    <a href="https://facebook.com" className="text-gray-400 hover:text-white mx-3 transition duration-300">
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                    </a>

                    <a href="https://twitter.com" className="text-gray-400 hover:text-white mx-3 transition duration-300">
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                    </a>

                    <a href="https://instagram.com" className="text-gray-400 hover:text-white mx-3 transition duration-300">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                            <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                        </svg>
                    </a>

                    <a href="https://linkedin.com" className="text-gray-400 hover:text-white mx-3 transition duration-300">
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-6 h-6" viewBox="0 0 24 24">
                            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                            <circle cx={4} cy={4} r={2} stroke="none" />
                        </svg>
                    </a>
                </div>
            </div>

            

            {/* Privacy & Terms Links */}
            <div className="container px-5 py-4 mx-auto flex justify-center sm:justify-between items-center border-t-2 border-gray-700">
                <div className="text-sm text-gray-400">
                    <Link to="/privacy-policy" className="hover:text-white mx-3 transition duration-300">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="hover:text-white mx-3 transition duration-300">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
