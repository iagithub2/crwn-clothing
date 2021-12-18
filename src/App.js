import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase/firebase.utils';

function App() {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/shop", element: <ShopPage /> },
    { path: "/signin", element: <SignInAndSignUp /> },
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // code to run on component mount
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log(user);
    });
  // code to run on component unmount
    return () => {
      auth.onAuthStateChanged();
    };
  }, [])

  return (
    <div className="App">
      <Header currentUser = {currentUser}/>
      {routes}
    </div>
  );
}

export default App;
