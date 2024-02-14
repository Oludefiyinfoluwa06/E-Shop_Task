import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<RootLayout />}>
        <Route index element={<Home />} />
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