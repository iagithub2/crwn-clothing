import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

function App() {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/shop", element: <ShopPage /> },
    // ...
  ]);
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
