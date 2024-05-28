import React, { useState } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicantAuth from "./ApplicantAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Footer from "./Footer";
import CompanyAuth from "./CompanyAuth";
import CreateJob from "./CreateJob";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import ExternalCompanies from "./ExternalCompanies";

function App() {
  const [refreshKey, setRefreshKey] = useState(0); // Add key state

  const refreshNavbar = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Update key to force re-render
  };

  return (
    <Router>
      <div className="App">
        <Navbar key={refreshKey} />
        <ToastContainer />
        <Routes>
          {/* Ana sayfa bileşeni veya diğer bileşenler buraya eklenebilir */}
          <Route path="/" element={<Home />} />
          <Route path="/sirketler" element={<Companies />} />
          <Route path="/ilanlar" element={<Jobs />} />
          <Route path="/aday-kayit" element={<ApplicantAuth refreshNavbar={refreshNavbar}/>} />
          <Route path="/sirket-kayit" element={<CompanyAuth refreshNavbar={refreshNavbar} />} />
          <Route path="/external-companies" element={<ExternalCompanies />} />
          <Route path="/is-paylas" element={<CreateJob />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
