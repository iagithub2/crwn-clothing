import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "shop/hats", element: <HatsPage /> },
    // ...
  ]);
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
