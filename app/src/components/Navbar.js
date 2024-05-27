import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { getCurrentUserType, auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const type = await getCurrentUserType();
        console.log("Fetched user type:", type);
        setUserType(type);
      } catch (error) {
        console.error("Failed to fetch user type:", error);
      }
    };

    fetchUserType();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUserType(null);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Job Odyssey</Link>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/sirketler">Şirketler</Link>
        </li>
        <li>
          <Link to="/ilanlar">İlanlar</Link>
        </li>
        <li>
          <Link to="/is-paylas">İş Paylaş</Link>
        </li>
      </ul>
      <div className="navbar-buttons">
        {userType === "company" ? (
          <>
            <Link to="/company-dashboard">
              <button className="btn green">Company Dashboard</button>
            </Link>
            <button className="btn red" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : userType === "applicant" ? (
          <>
            <Link to="/applicant-dashboard">
              <button className="btn blue">Applicant Dashboard</button>
            </Link>
            <button className="btn red" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/aday-kayit">
              <button className="btn blue">Kayıt Ol</button>
            </Link>
            <Link to="/sirket-kayit">
              <button className="btn red">Şirket Kayıt</button>
            </Link>
          </>
        )}
        <select className="language-select">
          <option value="tr">TR</option>
          <option value="en">EN</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
