import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Categories = ({ token }) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    axios.get('https://dummyjson.com/products/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setCategories(res.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.data.message === "Token Expired!") {
                localStorage.clear();
                localStorage.removeItem('user');
                navigate('/');
            }
        });

    return (
        <div className='categories'>
            {categories.map(category => (
                <Link to={`${category}`} className="category">
                    {category}
                </Link>
            ))}
        </div>
    );
}

export default Categories;