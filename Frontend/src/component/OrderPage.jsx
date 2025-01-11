import React, { useState } from 'react';

// Sample order data (you can replace this with dynamic data from an API)
const orders = [
  {
    orderId: '12345',
    items: [
      { name: 'Item 1', image: 'https://via.placeholder.com/50', price: 299, quantity: 2 },
      { name: 'Item 2', image: 'https://via.placeholder.com/50', price: 499, quantity: 1 },
    ],
    status: 'Delivered',
    orderTime: '2024-12-20 14:30',
    total: 1097,
  },
  {
    orderId: '12346',
    items: [
      { name: 'Item 3', image: 'https://via.placeholder.com/50', price: 199, quantity: 3 },
      { name: 'Item 4', image: 'https://via.placeholder.com/50', price: 899, quantity: 1 },
    ],
    status: 'Pending',
    orderTime: '2024-12-21 16:00',
    total: 1596,
  },
  {
    orderId: '12347',
    items: [
      { name: 'Item 5', image: 'https://via.placeholder.com/50', price: 120, quantity: 1 },
      { name: 'Item 6', image: 'https://via.placeholder.com/50', price: 349, quantity: 2 },
    ],
    status: 'Shipped',
    orderTime: '2024-12-22 10:15',
    total: 818,
  },
];

function OrderPage() {
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [filteredTime, setFilteredTime] = useState('All');

  const filteredOrders = orders.filter((order) => {
    if (filteredStatus !== 'All' && order.status !== filteredStatus) return false;
    if (filteredTime !== 'All' && order.orderTime.split(' ')[0] !== filteredTime) return false;
    return true;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Order Status Filter */}
        <div className="mb-6">
          <h3 className="font-medium">Order Status</h3>
          <select
            className="mt-2 w-full border-gray-300 rounded-md p-2"
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>

        {/* Order Time Filter */}
        <div>
          <h3 className="font-medium">Order Date</h3>
          <select
            className="mt-2 w-full border-gray-300 rounded-md p-2"
            value={filteredTime}
            onChange={(e) => setFilteredTime(e.target.value)}
          >
            <option value="All">All</option>
            <option value="2024-12-20">2024-12-20</option>
            <option value="2024-12-21">2024-12-21</option>
            <option value="2024-12-22">2024-12-22</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>

        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.orderId} className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Order #{order.orderId}</h2>
                <span
                  className={`text-sm font-medium ${
                    order.status === 'Delivered'
                      ? 'text-green-600'
                      : order.status === 'Pending'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                    <p className="text-gray-700">{item.name}</p>
                    <p className="text-gray-600">₹{item.price}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-gray-600">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-semibold">
                <p className="text-lg">Total</p>
                <p className="text-lg">₹{order.total}</p>
              </div>

              <div className="mt-4 text-sm text-gray-500">Ordered on: {order.orderTime}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrderPage;
