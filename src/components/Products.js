import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import ProductDetails from './ProductDetails';

const Products = ({ token }) => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://dummyjson.com/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.message === "Token Expired!") {
                    localStorage.clear();
                    localStorage.removeItem('user');
                    navigate('/');
                }
            })
            .finally(() => setIsLoading(false));
    }, [navigate, token]);

    const handleViewDetails = (productId) => {
        setSelectedProductId(productId);
        setShowProductDetails(true);
    }

    const handleCloseProductDetails = () => {
        setShowProductDetails(false);
    }

    return (
        <div className='products'>
            {isLoading ? (
                <Loading />
            ) : (
                products.map(product => (
                    <>
                        <div className="product" key={product.id}>
                            <img src={product.thumbnail} alt={product.title} />
                            <p style={{ fontSize: '13px', marginTop: '8px' }}>{product.title}</p>
                            <h3>${product.discountPercentage ? Math.ceil(product.discountPercentage / 100 * product.price) : product.price} {product.discountPercentage ? <small style={{ textDecoration: 'line-through', color: '#3c3c3c' }}>${product.price}</small> : ''}</h3>
                            <p style={{ color: '#ccc', fontSize: 15 }}>{product.stock} in stock</p>
                            {product.discountPercentage ? <p className="discount">{product.discountPercentage}%</p> : ''}
                            <button onClick={() => handleViewDetails(product.id)}>View details</button>
                        </div>
                        {selectedProductId === product.id && showProductDetails ? <ProductDetails productId={product.id} closeProductDetails={() => handleCloseProductDetails()} /> : ''}
                    </>
                ))
            )}
        </div>
    );
}

export default Products;