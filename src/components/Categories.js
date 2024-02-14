import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    axios.get('https://dummyjson.com/products/categories')
        .then(res => {
            setCategories(res.data);
        })
        .catch(err => {
            console.log(err);
        });

    return (
        <div className='categories'>
            {categories.map(category => (
                <Link to={`${category}`} className="category" key={category.id}>
                    {category}
                </Link>
            ))}
        </div>
    );
}

export default Categories;