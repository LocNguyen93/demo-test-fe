import './styles/index.scss';
import { Routes, Route } from 'react-router-dom';
import Products from "./pages/Products";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Shops from "./pages/Shops";
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/products" element={<Products />} />
      <Route path="/shops" element={<Shops />} />
    </Routes>
    </div>
  );
}

export default App;
