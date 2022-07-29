import './App.css';
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Navbar from './components/static/Navbar';
import Footer from './components/static/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Bars from './components/bars/Bars';
import Profile from './components/user/Profile';

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Navbar/>
        <div id="app-content">
          <Routes>
            <Route path="/" element={<Bars/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
