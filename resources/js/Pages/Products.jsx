import React from "react";
import Product from "./Product";
import { FaCartPlus } from "react-icons/fa";
import { router } from "@inertiajs/react";
import { CgProfile } from "react-icons/cg";

const Products = ({ user, products }) => {

  const handleUserCart = () => {
    router.post(`/get-cart-items/${user?.id}`);
    
  };

  const handleUserProfile = (user)=>{
    router.get(`/edit-user/${user.id}`);
  }

  return (
    <>
      <h3>
        <p>
          <FaCartPlus
            className="cart-logo"
            onClick={handleUserCart}
          />
        </p>
      </h3>

      <h3>
        <p>
          <CgProfile
            className="cart-logo"
            onClick={()=>handleUserProfile(user)}
          />
        </p>
      </h3>
      
      <div className="products-container">
        {products.map((item) => (
          <Product key={item.id} product={item} user={user} />
        ))}
      </div>
    </>
  );
};

export default Products;
