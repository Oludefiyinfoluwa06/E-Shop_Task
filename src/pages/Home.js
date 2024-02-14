import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem('user');

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);
    
    return (
        <>
            <Header />
        </>
    );
}

export default Home;