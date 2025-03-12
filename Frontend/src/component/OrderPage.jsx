import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../context/Context";
import axios from 'axios';
import { FaBox, FaTruck, FaCheck, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

function OrderPage() {
  const { Url } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [filteredTime, setFilteredTime] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Url}user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data.orderHistory || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [Url]);

  const orderDates = ['All', ...new Set(orders.map(order => 
    format(new Date(order.createdAt), 'yyyy-MM-dd')
  ))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheck className="w-5 h-5" />;
      case 'Shipped':
        return <FaTruck className="w-5 h-5" />;
      case 'Processing':
        return <FaBox className="w-5 h-5" />;
      default:
        return <FaClock className="w-5 h-5" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const orderDate = format(new Date(order.createdAt), 'yyyy-MM-dd');
    return (filteredStatus === 'All' || order.status === filteredStatus) &&
           (filteredTime === 'All' || orderDate === filteredTime);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Full width on mobile, fixed width on desktop */}
      <div className="w-full lg:w-64 bg-white shadow-md p-4 lg:p-6 lg:sticky lg:top-0 lg:h-screen">
        <h2 className="text-xl font-bold mb-6">Filter Orders</h2>

        {/* Order Status Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Order Status</h3>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
          >
            <option value="All">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Order Date Filter */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Order Date</h3>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filteredTime}
            onChange={(e) => setFilteredTime(e.target.value)}
          >
            {orderDates.map(date => (
              <option key={date} value={date}>
                {date === 'All' ? 'All Dates' : format(new Date(date), 'MMM dd, yyyy')}
              </option>
            ))}
          </select>
        </div>

        {/* Order Statistics */}
        <div className="mt-8">
          <h3 className="font-medium text-gray-700 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-semibold">{orders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivered</span>
              <span className="font-semibold">{orders.filter(o => o.status === 'Delivered').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">In Transit</span>
              <span className="font-semibold">{orders.filter(o => o.status === 'Shipped').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8">
          <h1 className="text-xl md:text-2xl font-bold mb-2 sm:mb-0">Your Orders</h1>
          <p className="text-gray-600">Showing {filteredOrders.length} orders</p>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <FaBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="font-medium">{order.status}</span>
                  </div>
                </div>

                <div className="border-t border-b py-4 my-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img
                      src={order.images[0]}
                      alt={order.title}
                      className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{order.title}</h3>
                      <p className="text-gray-600">Brand: {order.brand}</p>
                      <p className="text-gray-600">Quantity: {order.quantity}</p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="font-bold text-lg">${order.price}</p>
                      {order.discountPercentage > 0 && (
                        <p className="text-green-600 text-sm">
                          {order.discountPercentage}% OFF
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                  <div className="text-gray-500 mb-2 sm:mb-0">
                    Ordered on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </div>
                  <div className="flex space-x-4 w-full sm:w-auto">
                    <button className="text-blue-600 hover:text-blue-700 font-medium w-1/2 sm:w-auto">
                      Track Order
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 font-medium w-1/2 sm:w-auto">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
