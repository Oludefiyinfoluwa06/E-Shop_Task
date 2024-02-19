import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import Loading from './Loading';

const CategoryProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState();
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { category } = useParams();

    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://dummyjson.com/products/category/${category}`)
            .then(res => {
                console.log(res);
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    }, [category]);

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
                products.map((product, index) => (
                    <>
                        <div className="product" key={index}>
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

export default CategoryProducts;