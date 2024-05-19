import React from 'react';
import './Cards.css';

const CARD_CLASS = "bg-white rounded-lg shadow-md";
const PROFILE_IMG_CLASS = "w-8 h-8 rounded-full mr-2";
const TEXT_CLASS = "text-lg font-bold";
const TEXT_SMALL_CLASS = "text-sm text-zinc-600";

const Cards = () => {
    return (
        <div className="card">
            <div className={`${CARD_CLASS} w-80 mb-4 mr-4`}>
                <img src="https://placehold.co/300x200" alt="Job Image" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <img src="https://placehold.co/40" alt="Profile Photo" className={PROFILE_IMG_CLASS} />
                            <span className="font-bold">Company Name</span>
                        </div>
                        <span className={TEXT_SMALL_CLASS}>Salary Type</span>
                    </div>
                    <p className={TEXT_CLASS}>Job Title</p>
                    <p className={TEXT_SMALL_CLASS}>Department</p>
                </div>
            </div>
        </div>
    );
};

export default Cards;
