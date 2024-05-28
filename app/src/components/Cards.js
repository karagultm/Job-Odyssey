import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Cards.css';

const Cards = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'jobs'));
            const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobs(jobsData);
        };

        fetchJobs();
    }, []);

    const handleCardClick = (jobId) => {
        navigate(`/job/${jobId}`);
    };

    return (
        <div className="cards-container">
            {jobs.map((job) => (
                <div key={job.id} className="card" onClick={() => handleCardClick(job.id)}>
                    <img src={job.jobPicture || "https://placehold.co/300x200"} alt="Job Image" className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="content">
                        <div className="header">
                            <div className="flex items-center">
                                <img src="https://placehold.co/40" alt="Profile Photo" className="w-8 h-8 rounded-full mr-2" />
                                <span className="title">{job.companyName || "Company Name"}</span>
                            </div>
                            <span className="text-jt">{job.jobType || "Job Type"}</span>
                        </div>
                        <p className="text-lg">{job.jobName || "Job Title"}</p>
                        <p className="text-dep">{job.jobDescription || "Job Description"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
