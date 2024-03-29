import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Products from '../components/Products';

const Home = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);

    return (
        <>
            <Header title='Shop in style' content='Begin your purchases with us and find high quality products' />
            <Products token={user.token} />
        </>
    );
}

export default Home;