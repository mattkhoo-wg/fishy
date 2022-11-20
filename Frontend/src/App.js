import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/Landingpage';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
      </Routes>
      {/* <ToastContainer /> */}
    </Router>
  );
}

export default App;
