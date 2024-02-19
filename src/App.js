import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import CategoryLayout from './layouts/CategoryLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import CategoryProducts from './components/CategoryProducts';
import SearchProducts from './components/SearchProducts';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='search/:query' element={<SearchProducts />} />
        <Route path='me' element={<Profile />} />
        <Route path='cart' element={<Cart />} />
        <Route path='categories' element={<CategoryLayout />}>
          <Route path=':category' element={<CategoryProducts />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;