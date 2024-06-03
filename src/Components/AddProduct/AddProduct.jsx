import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import upload_area from '/upload_area.png';
import { toast } from "react-toastify";

const AddProduct = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    category: "mini",
    price: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // For API CALL
  // To prevent reloading page
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    // formData will contain key/value pairs where the keys are the names of the form fields and the values are the corresponding values entered by the user. This formData object can then be used to send the form data to a server
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    // This is the endpoint where we upload the product and stored in the backend folder - UPLOAD
    const response = await axios.post(`${url}/addproduct`, formData);

    // To check if it is sent - form should be reset
    if (response.data.success) {
      setData({
        name: "",
        category: "mini",
        price: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="mini">Miniature Painting</option>
              <option value="abstract">Abstract Painting</option>
              <option value="new">New In Painting</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$250' />
          </div>
        </div>

        <button type="submit" className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default AddProduct;
