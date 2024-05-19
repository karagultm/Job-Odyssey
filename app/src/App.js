import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register_personal from './Register_personal';
import Home from './Home';
import Companies from './Companies';
import Jobs from './Jobs';
import Footer from './Footer';
import Register_company from './Register_company';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Ana sayfa bileşeni veya diğer bileşenler buraya eklenebilir */}
          <Route path="/" element={<Home />} />
          <Route path="/sirketler" element={<Companies />} />
          <Route path="/ilanlar" element={<Jobs />} />
          <Route path="/kayit-ol" element={<Register_personal />} />
          <Route path="/kayit-ol-company" element={<Register_company />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
