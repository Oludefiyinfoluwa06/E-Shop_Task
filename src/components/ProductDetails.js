import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/ProductDetails.css';

const ProductDetails = ({ productId, closeProductDetails }) => {
    const [productDetails, setProductDetails] = useState({});
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${productId}`)
            .then(res => {
                console.log(res);
                setProductDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [productId]);

    useEffect(() => {
        if (productDetails.images) {
            setProductImages(productDetails.images);
        }
    }, [productDetails]);

    const handleCloseProductDetails = () => {
        closeProductDetails();
    }

    return (
        <div className='product-details'>
            <div className="close" onClick={handleCloseProductDetails}>
                <FaTimes />
            </div>
            <div className="details">
                <div className="imgs">
                    <div className="other-imgs">
                        {productImages.map((img, index) => (
                            <img src={img} alt="Product" key={index} />
                            ))}
                    </div>
                    <img src={productDetails.thumbnail} alt={productDetails.title} />
                </div>
                <div className="details-content">
                    <h3 style={{ margin: '8px 0' }}>{productDetails.title}</h3>
                    {productDetails.discountPercentage ? <p className="discount">{productDetails.discountPercentage}% discount</p> : ''}
                    <h3>${productDetails.discountPercentage ? Math.ceil(productDetails.discountPercentage / 100 * productDetails.price) : productDetails.price} {productDetails.discountPercentage ? <small style={{ textDecoration: 'line-through', color: '#3c3c3c' }}>${productDetails.price}</small> : ''}</h3>
                    <p style={{ color: '#ccc', fontSize: 15 }}>{productDetails.stock} in stock</p>
                    <button>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;