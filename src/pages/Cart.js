import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import '../styles/Cart.css';

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const userId = user.id;

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://dummyjson.com/carts/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                setCart(res.data.carts[0].products);
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.message === "Token Expired!") {
                    localStorage.clear();
                    localStorage.removeItem('user');
                    navigate('/');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [navigate, userId, token]);

    return (
        <div className="cart">
            {isLoading ? (
                <Loading />
            ) : (
                cart.length !== 0 ? (
                    cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.thumbnail} alt="" />
                            <div className="item-info">
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button>Remove</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )
            )}
        </div>
    );
}

export default Cart;