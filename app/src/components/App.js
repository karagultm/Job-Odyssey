import React from 'react';
import '../styles/App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterApplicant from './RegisterApplicant';
import Home from './Home';
import Companies from './Companies';
import Jobs from './Jobs';
import Footer from './Footer';
import CompanyAuth from './CompanyAuth';

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
          <Route path="/kayit-ol" element={<RegisterApplicant />} />
          <Route path="/sirket-kayit" element={<CompanyAuth />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
