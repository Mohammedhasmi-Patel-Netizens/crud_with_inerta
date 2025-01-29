import React from 'react';
import Product from './Product';

const Products = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((item) => (
        <Product key={item.id} product={item} /> 
      ))}
    </div>
  );
};

export default Products;
