import React, { useEffect, useState } from "react";
import { Copy, Upload, X } from "lucide-react";
import axios from 'axios'
// import dotenv from 'dotenv';
// dotenv.config();
const CLOUDINARY=import.meta.env.VITE_CLOUDINARY;
function ImageGallery() {
  const backendUrl = import.meta.env.VITE_URLAPI;
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState("");
  useEffect(()=>{
    getimage();
  },[])
  const getimage=()=>{

    axios.get(`${backendUrl}getimage`)
    .then((res) => {
      console.log(res.data);
      setImages(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  const handleImageChange = async (field) => {
    const file = field[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "du15dlpjn");
    const res = await fetch(VITE_CLOUDINARY,
      {
        method: "POST",
        body: data,
      }
    );
    const imageUrl = await res.json();
    const image=imageUrl.url;
    console.log(image);
    
    setImages([...images, { url: image, name: file.name || 'Untitled' }]);

    axios.post(`${backendUrl}imageGallary`, { image: image })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(images);
    
  };
  const copyToClipboard = (url) => {
    setCopiedUrl(url);
    setModalOpen(true);
    navigator.clipboard.writeText(url);
  };

  const filteredImages = images.filter((image) =>
    image.images && image.images.includes(search.toLowerCase())
  );


  return (
    <div className=" mx-auto p-6 ">
      {/* Upload Section */}
      <div className="flex flex-col items-center mb-6">
        <label className="cursor-pointer">
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files)} className="hidden" />
          <div className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-100 hover:bg-gray-200 transition duration-300">
            <Upload size={42} className="text-gray-600 mb-2" />
            <span className="text-gray-600 text-sm font-semibold">Upload Image</span>
          </div>
        </label>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search images..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 top-5">
        {filteredImages.map((image, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg top-5">
            <img src={image.images} alt={image.name} className="w-full h-64 object-cover rounded-lg" />
            {console.log(image)
            }
            <button
              onClick={() => copyToClipboard(image.images)}
              title="Copy URL"
              className="absolute group-hover:h-full group-hover:justify-center group-hover:w-full group-hover:top-0  bg-black/70 text-white px-3 py-1 text-sm font-semibold rounded-md shadow-md  group-hover:opacity-100 transition duration-300 flex items-center space-x-1"
            >
              <Copy size={2} />
              <span className="">Copy URL</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modern Styled Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  p-10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl  text-center relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
            >
              <X size={22} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">✅ URL Copied Successfully!</h2>
            <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg border border-gray-300">
              <input
                type="text"
                value={copiedUrl}
                readOnly
                className="w-full bg-transparent text-gray-700 font-medium text-sm text-center outline-none"
              />
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-5 px-5  py-2 bg-blue-600 text-white rounded-4xl shadow-md hover:bg-blue-700 transition duration-300 font-medium"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
