import React from 'react';
import '../../css/Product.css';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img
        className="product-image"
        src={`http://127.0.0.1:8000/storage/${product.image_uri}`} 
        alt={product.name}
      />
      <p className="product-name">{product.name}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{product.price}</p>
    </div>
  );
};

export default Product;
