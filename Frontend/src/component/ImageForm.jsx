import { useEffect, useState } from "react";
import axios from "axios";

function ImageForm() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      const result = await axios.post(
        "http://localhost:9000/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result.data);
      getImage(); // Reload images after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:9000/get-image");
      setAllImage(result.data.data); // assuming 'data' contains the list of images
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitImage} encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button className="bg-blue-600" type="submit">Submit</button>
      </form>

      {allImage == null ? (
        <p>No images uploaded yet</p>
      ) : (
        allImage.map((data, index) => {
          return (
            <img
              key={index}
              src={`http://localhost:9000/uploads/${data.image}`} // Change based on your backend structure
              alt="Uploaded"
              height={100}
              width={100}
            />
          );
        })
      )}
    </div>
  );
}

export default ImageForm;
