import './App.css';
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Navbar from './components/static/Navbar';
import Footer from './components/static/Footer';
import HomePage from './components/home/HomePage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Bars from './components/bars/Bars';
import SearchBars from './components/bars/SearchBars';
import Bar from './components/bars/Bar';
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
            <Route path="/">
              <Route index 
                element={(
                  <GeneralWrapper>
                    <HomePage/>
                  </GeneralWrapper>
                )}
              />
              
              <Route path="signup"
                element={(
                  <GeneralWrapper>
                    <Signup/>
                  </GeneralWrapper>
                )}
              />

              <Route path="login"
                element={(
                  <GeneralWrapper>
                    <Login/>
                  </GeneralWrapper>
                )}
              />

              <Route path="search-bars">
                <Route index 
                  element={(
                    <GeneralWrapper>
                      <SearchBars/>
                    </GeneralWrapper>
                  )}
                />
                <Route path="bars">
                  <Route index 
                    element={(
                      <GeneralWrapper>
                        <Bars/>
                      </GeneralWrapper>
                    )}
                  />
                  <Route
                    path=":barId"
                    element={(
                      <GeneralWrapper>
                        <Bar/>
                      </GeneralWrapper>
                    )}
                  />
                </Route>
              </Route>

              <Route
                path="profile"
                element={(
                  <AuthWrapper>
                    <Profile/>
                  </AuthWrapper>
                )}
              />
            </Route>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
