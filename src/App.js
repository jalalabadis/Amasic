import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import PasswordRecover from './pages/PasswordRecover';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/product/:id' element={<Product/>}></Route>
      <Route path='/search/:id' element={<Search/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/favorites' element={<Favorites/>}></Route>
      <Route path='/password/recovery' element={<PasswordRecover/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
