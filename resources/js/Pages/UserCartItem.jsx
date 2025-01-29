import React, { useEffect } from 'react'
import "../../css/ShowProduct.css"
import TotalBill from './TotalBill';

const UserCartItem = ({ products }) => {
    let total_bill_price = 0;

    {

        products.forEach((item) => {
            total_bill_price += item.product.price * item.quantity;
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.product.id}>
                            <td>{item.product.id}</td>
                            <td>{item.product.name}</td>
                            <td>{item.product.description}</td>
                            <td>{item.product.price}</td>
                            <td>
                                <img
                                    src={`http://127.0.0.1:8000/storage/${item.product.image_uri}`}
                                    alt={item.product.name}
                                />
                            </td>

                            <td>{item.quantity}</td>
                            <td>{item.product.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="bill-container">
                <TotalBill totalBill={total_bill_price} />
            </div>


        </div>
    )

}

export default UserCartItem
