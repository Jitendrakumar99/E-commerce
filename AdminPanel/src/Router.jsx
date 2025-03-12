import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Dashboard from './Components/Dashboard'; // Dashboard Page
import AddItem from './Components/AddItem'; // AddItem Page
import EditItem from './Components/EditItem'; // EditItem Page
import Table from './Components/Table'; // Table Page
import Dashboard from './Components/Dashboard';
import ImageGallery from './Components/ImageGallary'
import PhoneLogin from './Firebase/PhoneLogin'
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/image" element={<ImageGallery />} />
      <Route path="/edit-item" element={<EditItem />} />
      <Route path="/table" element={<Table />} />
      <Route path="/login" element={<PhoneLogin />} />
    </Routes>
  );
};

export default AppRouter;
