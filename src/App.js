import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from "firebase/firestore";
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'


class App extends React.Component{

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userDocRef = await createUserProfileDocument(userAuth);
          onSnapshot(userDocRef, snapshot=>{
          setCurrentUser({
            id:snapshot.id,
            ...snapshot.data()
          }
          );
        });
      }else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header/>
        <RoutesHandler/>
      </div>
    );
  } 
} 

const RoutesHandler = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/shop", element: <ShopPage /> },
    { path: "/signin", element: <SignInAndSignUp /> },
  ]);

  return <div>{routes}</div>;
};

const mapDispatchToProps = dispatch =>({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);

























/*function AppFunctionalComponent() {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/shop", element: <ShopPage /> },
    { path: "/signin", element: <SignInAndSignUp /> },
  ]);

  const [currentUser, setCurrentUser] = useState(null);
 
  useEffect(() => {
    (async () => {
    // code to run on component mount
    auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userDocRef = await createUserProfileDocument(userAuth);
                onSnapshot(userDocRef, snapshot=>{
          setCurrentUser({
            id:snapshot.id,
            ...snapshot.data()
          }
          );
        });
      }else{
        setCurrentUser(userAuth);
      }
    });
    })();
    // code to run on component unmount
    return () => {
      auth.onAuthStateChanged();
    };
  }, [])

  return (
    <div className="App">
      <Header/>
      {routes}
    </div>
  );
}*/
