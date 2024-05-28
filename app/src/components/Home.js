import React from 'react';
import '../styles/Home.css';
import Searchbar from './Searchbar';
import Cards from './Cards';

const Home = () => {
    return (
        <div className="home">
            <div className="home-header">
                <h1>İlanları Keşfet</h1>
                <div className="search-box">
                    <Searchbar />
                </div>
            </div>

            <div className="all-jobs-section">
                <h2>Tüm İlanlar</h2>
                <div className="cards-container">
                    {/* <CreateJob /> */}
                    <Cards />
                    {/* Burada tüm iş ilanlarını göstereceğiz */}
                </div>
            </div>
        </div>
    );
}

export default Home;
