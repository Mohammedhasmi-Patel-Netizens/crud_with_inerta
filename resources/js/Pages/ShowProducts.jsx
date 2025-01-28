import { Link, router } from "@inertiajs/react";
import React from "react";
import '../../css/ShowProduct.css'

const ShowProducts = ({ products }) => {

    const handleEdit = (id) => {
        console.log("Edit product with ID:", id);
        // Logic to navigate to edit page, e.g., using Inertia's Link
        router.get(`/edit-product/${id}`);
    };

    const handleDelete = (id)=>{
        router.delete(`/delete-product/${id}`);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>
                                <img
                                    src={`http://127.0.0.1:8000/storage/${item.image_uri}`}
                                    alt={item.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src="path/to/default/image.jpg"; }}
                                    style={{ width: '100px', height: 'auto' }} // Optional inline styling
                                />
                            </td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(item.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={()=>handleDelete(item.id)}
                                    // href = {`delete-product/${item.id}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowProducts;
