// Pages/Home.jsx
import { Link } from '@inertiajs/react';
import React from 'react';
import {ToastContainer,toast} from 'react-toastify'

const Home = ({success}) => {

  if(success){
    toast("product added successfully.....")
  }


    return (
        <div>
          <Link href='/add-product'>Add Products</Link>
          <ToastContainer/>
        </div>
    );
};

export default Home;