import React from 'react';
import { Outlet } from 'react-router-dom';
import Categories from '../components/Categories';
import '../styles/Category.css';
import Category from '../pages/Category';

const CategoryLayout = () => {
    return (
        <div>
            <Category />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default CategoryLayout;