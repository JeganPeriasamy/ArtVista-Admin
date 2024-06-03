import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '/cross_icon.png';
import axios from "axios";
import { toast } from 'react-toastify';

const ListProduct = ({ url }) => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${url}/allproducts`);
      console.log(response.data);
      if (response.data.success) {
        setAllProducts(response.data.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the products");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/removeproduct`, { id: productId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProduct();  // Refresh the product list after removal
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("An error occurred while removing the product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((item, index) => (
          <div key={item._id}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={item.image} alt="" />
              <p className="cartitems-product-title">{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <img
                className="listproduct-remove-icon"
                onClick={() => removeProduct(item._id)}
                src={cross_icon}
                alt=""
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
