import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Categories from '../components/Categories';

const Category = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);

    return (
        <>
            <Header title='Categories' content='Explore categories for all our products' />
            <div className="categories">
                <Categories token={user.token} />
            </div>
        </>
    );
}

export default Category;