import React from 'react';
import '../../css/TotalBill.css'; 

const TotalBill = ({ totalBill }) => {
    return (
        <div className="total-bill">
            <h2>Total Bill</h2>
            <p className="amount">₹{totalBill.toFixed(2)}</p> 
        </div>
    );
};

export default TotalBill;
