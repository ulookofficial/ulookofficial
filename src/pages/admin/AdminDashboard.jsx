import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetail';
import UserDetail from '../../components/admin/UserDetail';
import { useContext } from 'react';
import myContext from '../../context/myContext';
import Layout from "../../components/layout/Layout";
import { FaShoppingCart, FaUsers, FaClipboardList } from 'react-icons/fa'; // Using react-icons for modern icons

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct, getAllOrder, getAllUser } = context;

    return (
        <Layout>
            <div className="admin-dashboard px-6 py-10">
                {/* Profile Section */}
                <div className="user-profile mb-8 flex justify-center">
                    <div className="profile-card bg-white rounded-lg p-6 shadow-lg w-full md:w-1/2 xl:w-1/3">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-4 border-pink-300"
                            />
                        </div>
                        <h2 className="text-center text-2xl font-bold text-pink-600">{user?.name}</h2>
                        <p className="text-center text-lg text-pink-500">{user?.role}</p>
                        <p className="text-center text-lg text-pink-500">{user?.email}</p>
                        <p className="text-center text-sm text-pink-400">{user?.date}</p>
                    </div>
                </div>

                {/* Tabs Section */}
                <Tabs>
                    <TabList className="flex justify-center mb-6 space-x-6">
                        {/* Total Products Tab */}
                        <Tab className="tab-item p-4 cursor-pointer text-lg font-semibold text-pink-500 hover:text-white hover:bg-pink-500 rounded-lg transition-all duration-200 ease-in-out">
                            <FaShoppingCart className="inline-block mr-2" size={20} />
                            Products
                        </Tab>

                        {/* Total Orders Tab */}
                        <Tab className="tab-item p-4 cursor-pointer text-lg font-semibold text-pink-500 hover:text-white hover:bg-pink-500 rounded-lg transition-all duration-200 ease-in-out">
                            <FaClipboardList className="inline-block mr-2" size={20} />
                            Orders
                        </Tab>

                        {/* Total Users Tab */}
                        <Tab className="tab-item p-4 cursor-pointer text-lg font-semibold text-pink-500 hover:text-white hover:bg-pink-500 rounded-lg transition-all duration-200 ease-in-out">
                            <FaUsers className="inline-block mr-2" size={20} />
                            Users
                        </Tab>
                    </TabList>

                    {/* Tabs Panels */}
                    <div className="tab-panels">
                        <TabPanel>
                            <ProductDetail />
                        </TabPanel>

                        <TabPanel>
                            <OrderDetail />
                        </TabPanel>

                        <TabPanel>
                            <UserDetail />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
