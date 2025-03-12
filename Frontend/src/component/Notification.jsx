import React, { useState ,useContext} from 'react';
import { FaShoppingCart, FaGift, FaBell, FaTimes } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { AppContext } from '../context/Context';
function Notification() {
  const {isOpen,setIsOpen}=useContext(AppContext);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'offer',
      title: 'Special Discount!',
      message: 'Get 20% off on all electronics. Limited time offer!',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: 2,
      type: 'cart',
      title: 'Items in Cart',
      message: 'You have items waiting in your cart. Complete your purchase now!',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: 3,
      type: 'offer',
      title: 'Flash Sale Alert!',
      message: 'Flash sale starting in 2 hours. Up to 50% off on fashion!',
      time: '30 minutes ago',
      isRead: false,
    },
    {
      id: 4,
      type: 'cart',
      title: 'Price Drop Alert',
      message: 'An item in your cart just got cheaper. Buy now!',
      time: '15 minutes ago',
      isRead: false,
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      {/* <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FaBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button> */}

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors duration-150 ${
                    notification.isRead ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {notification.type === 'offer' ? (
                        <MdLocalOffer className="h-6 w-6 text-yellow-500" />
                      ) : (
                        <FaShoppingCart className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <button
                          onClick={() => handleRemoveNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {notification.time}
                        </span>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
