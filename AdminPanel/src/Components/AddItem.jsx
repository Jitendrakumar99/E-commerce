import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AddItem.css";
const AddItem = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    sku: "",
    weight:"",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
    tags: [],
    reviews:[],
    dimensions: { "width": 0, "height": 0, "depth": 0 },
    images: [],
  });
  const [tag, setTags] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleNestedChange = (field, key, value) => {
    const updatedField = productData[field];
    updatedField[key]=value
    console.log(updatedField);
    setProductData({ ...productData, [field]: updatedField });
  };
  const handleTagsChange = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const { value } = e.target;
      setProductData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, value],
      }));
      setTags("");
    }
    console.log(productData);
  };
console.log(productData);

  const handleImageChange = async (field) => {
    const file = field[0];
    console.log(file);
    
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "du15dlpjn");
    const res = await fetch(import.meta.env.VITE_CLOUDINARY,
      {
        method: "POST",
        body: data,
      }
    );
    const imageurl = await res.json();
    console.log(imageurl.url);
    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, imageurl.url ],
    }));
    console.log(productData);
    
  };

  const handleAddField = (field) => {
    console.log(field);
    setProductData({
      ...productData,
      [field]: [...productData[field], {}],
    });
    console.log(productData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    axios
      .post("https://e-commerce-backend-czqd.onrender.com/AddProduct", productData)
      .then((res) => {
        console.log("store");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-0 left-0">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3 row">
          <div className="col">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
          />
          </div>

          <div className="col">
          <label className="form-label">Rating</label>
          <input
            type="Number"
            className="form-control"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            required
          />
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={productData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control mb-2"
            name="category"
            value={productData.category} // Bind to the temporary inputValue
            onChange={handleChange}
            required
          />
        </div>

        {/* Price, Stock, and Discount */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Discount Percentage</label>
            <input
              type="number"
              className="form-control"
              name="discountPercentage"
              value={productData.discountPercentage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* SKU and Brand */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">SKU</label>
            <input
              type="text"
              className="form-control"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">weight</label>
            <input
              type="Number"
              className="form-control"
              name="weight"
              value={productData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Warranty Information */}
        <div className="mb-3">
          <label className="form-label">Warranty Information</label>
          <textarea
            className="form-control"
            name="warrantyInformation"
            rows="2"
            value={productData.warrantyInformation}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Shipping Information */}
        <div className="mb-3">
          <label className="form-label">Shipping Information</label>
          <textarea
            className="form-control"
            name="shippingInformation"
            rows="2"
            value={productData.shippingInformation}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Availability Status */}
        <div className="mb-3">
          <label className="form-label">Availability Status</label>
          <input
            type="text"
            className="form-control"
            name="availabilityStatus"
            value={productData.availabilityStatus}
            onChange={handleChange}
          />
        </div>

        {/* Return Policy */}
        <div className="mb-3">
          <label className="form-label">Return Policy</label>
          <textarea
            className="form-control"
            name="returnPolicy"
            rows="2"
            value={productData.returnPolicy}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Tags */}
        <div className="mb-3">
          <label className="form-label">Tags(Press Enter to Add More)</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter comma-separated tags"
            onKeyDown={(e) => handleTagsChange(e)}
            value={tag}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="row ml-5">
            {productData.tags.length > 0 &&
              productData.tags?.map((data) => (
                <div className="lettercard">{data}</div>
              ))}
          </div>
        </div>

        {/* Dimensions */}
        <h4>Dimensions</h4>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Width</label>
              <input
                type="number"
                className="form-control"
                value={productData.dimensions['width']}
                onChange={(e) =>
                  handleNestedChange(
                    "dimensions",
                    "width",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="col">
              <label className="form-label">Height</label>
              <input
                type="number"
                className="form-control"
                value={productData.dimensions.height}
                onChange={(e) =>
                  handleNestedChange(
                    "dimensions",
                    "height",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="col">
              <label className="form-label">Depth</label>
              <input
                type="number"
                className="form-control"
                value={productData.dimensions.depth}
                onChange={(e) =>
                  handleNestedChange(
                    "dimensions",
                    "depth",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

        {/* Images */}
        <h4>Images(Press enter to Add More)</h4>
        <div className="d-flex ">
          <input
            type="file"
            accept="image/*"
            className="d-none"
            id="fileInput"
            onChange={(e) => handleImageChange(e.target.files)}
          />
          <div className="d-flex flex-wrap">
          <label htmlFor="fileInput">
              <img
                src={'addimage.png'}
                alt="Preview"
                className="Preview ms-2 mt-2"
              />
          </label>
              {productData.images.length>0&&
                productData.images?.map((data) => (
                  <div className="Preview ms-2 mt-2">
                    <img className="Previewimage" src={data} alt="img" />
                  </div>
                ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
