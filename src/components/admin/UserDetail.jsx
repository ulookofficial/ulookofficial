import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { FaSearch } from 'react-icons/fa'; // Add search icon

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;

    // Search state for filtering users
    const [searchQuery, setSearchQuery] = useState("");

    // Filter users based on search input
    const filteredUsers = getAllUser.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="py-6 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200">
            <div className="max-w-screen-xl mx-auto px-4">

                {/* Heading Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl text-pink-500 font-bold">All Users</h1>

                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 rounded-lg border border-pink-300 w-72"
                            placeholder="Search by name, email, or role"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-pink-500" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                    <table className="min-w-full table-auto text-sm text-left text-pink-600">
                        <thead className="bg-slate-100 text-slate-700">
                            <tr>
                                <th className="py-3 px-6 font-bold">S.No.</th>
                                <th className="py-3 px-6 font-bold">Name</th>
                                <th className="py-3 px-6 font-bold">Email</th>
                                <th className="py-3 px-6 font-bold">Uid</th>
                                <th className="py-3 px-6 font-bold">Role</th>
                                <th className="py-3 px-6 font-bold">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-6 text-center text-gray-500">No users found</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-pink-50 transition duration-300 ease-in-out"
                                    >
                                        <td className="py-4 px-6">{index + 1}</td>
                                        <td className="py-4 px-6 font-semibold">{user.name}</td>
                                        <td className="py-4 px-6 text-blue-500 cursor-pointer hover:underline">
                                            {user.email}
                                        </td>
                                        <td className="py-4 px-6">{user.uid}</td>
                                        <td className="py-4 px-6">{user.role}</td>
                                        <td className="py-4 px-6">{user.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
