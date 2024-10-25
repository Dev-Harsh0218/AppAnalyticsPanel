import React from 'react';
import {BrowserRouter as Router , Routes, Route} from'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashBoardPage from './pages/DashBoardPage';


function App() {
  return<>
  <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/dashboard" element={<DashBoardPage/>}></Route>
    </Routes>
  </Router>
  </>
}

export default App
