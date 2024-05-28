import React, { useState, useEffect } from 'react';
import '../styles/ExternalCompanies.css'; // Adjust the path if needed

const ExternalCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Fetch data from externalCompanies.json
        const response = await fetch('/externalCompanies.json');
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="cards-container">
      {companies.map(company => (
        <div className="card" key={company.id}>
          <div className="content">
            <div className="header">
              <div className="title">{company.name}</div>
            </div>
            <div className="body">
              <p><strong>Location:</strong> {company.location}</p>
              <p><strong>Title:</strong> {company.title}</p>
              <p>{company.description}</p>
            </div>
            <div className="footer">
              <a href={company.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExternalCompanies;
