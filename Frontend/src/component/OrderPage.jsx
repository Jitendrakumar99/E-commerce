import React, { useState } from 'react';

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

  const orderDates = ['All', ...new Set(orders.map(order => order.orderTime.split(' ')[0]))];

  const filteredOrders = orders.filter(order => {
    return (filteredStatus === 'All' || order.status === filteredStatus) &&
           (filteredTime === 'All' || order.orderTime.startsWith(filteredTime));
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 shadow-md">
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

        {/* Order Date Filter */}
        <div>
          <h3 className="font-medium">Order Date</h3>
          <select
            className="mt-2 w-full border-gray-300 rounded-md p-2"
            value={filteredTime}
            onChange={(e) => setFilteredTime(e.target.value)}
          >
            {orderDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
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
            <div key={order.orderId} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h2>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b pb-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gray-600 font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-semibold text-lg">
                <p>Total</p>
                <p>₹{order.total}</p>
              </div>

              <div className="mt-3 text-sm text-gray-500">Ordered on: {order.orderTime}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrderPage;
