import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import '../styles/Profile.css';

const Profile = () => {
    const [me, setMe] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
    }, [navigate, user]);

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://dummyjson.com/auth/me', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                console.log(res);
                setMe(res.data);
            })
            .catch(err => {
                if (err.response.data.message === "Token Expired!") {
                    localStorage.clear();
                    localStorage.removeItem('user');
                    navigate('/');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [navigate, user.token]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ): (
                <div className="profile">
                    <h2>Personal Information</h2>
                    <img src={me.image} alt={me.username} />
                    <div className="profile-info">
                        <div className="info">
                            <h3>Fullname</h3>
                            <h3>{me.lastName} {me.firstName}</h3>
                        </div>
                        <div className="info">
                            <h3>Maiden name</h3>
                            <h3>{me.maidenName}</h3>
                        </div>
                        <div className="info">
                            <h3>Gender</h3>
                            <h3>{me.gender}</h3>
                        </div>
                        <div className="info">
                            <h3>Email</h3>
                            <h3>{me.email}</h3>
                        </div>
                        <div className="info">
                            <h3>Phone</h3>
                            <h3>{me.phone}</h3>
                        </div>
                        <div className="info">
                            <h3>Birthdate</h3>
                            <h3>{me.birthDate}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;