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
// Wrappers
import GeneralWrapper from './components/wrappers/GeneralWrapper';
import AuthWrapper from './components/wrappers/AuthWrapper';

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Navbar/>
        <div id="app-content">
          <Routes>
            <Route 
              path="/"
              element={(
                <GeneralWrapper>
                  <Bars/>
                </GeneralWrapper>
              )}
            />

            <Route
              path="/signup"
              element={(
                <GeneralWrapper>
                  <Signup/>
                </GeneralWrapper>
              )}
            />

            <Route
              path="/login"
              element={(
                <GeneralWrapper>
                  <Login/>
                </GeneralWrapper>
              )}
            />

            <Route
              path="/profile"
              element={(
                <AuthWrapper>
                  <Profile/>
                </AuthWrapper>
              )}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
