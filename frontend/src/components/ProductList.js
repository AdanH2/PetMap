import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const ProductList = () => {
    const [products, setProduct] = useState([]);
 
    useEffect(() => {
        getProducts();
    }, []);
 
    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        setProduct(response.data);
    }
 
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <div>
            <Link to="/" className="button is-primary mt-2" style={{marginRight:'20px'}}>Log Out</Link>
            <Link to="/add" className="button is-primary mt-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, index) => (
                        <tr key={ product.id } data-testid="product">
                            <td>{ index + 1 }</td>
                            <td>{ product.title }</td>
                            <td>{ product.price }</td>
                            <td>
                                <Link to={`/edit/${product.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={ () => deleteProduct(product.id) } className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default ProductList;