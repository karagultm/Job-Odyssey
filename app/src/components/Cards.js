import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import '../styles/Cards.css';

const Cards = () => {
    const [jobs, setJobs] = useState([]);
    const [companiesCache, setCompaniesCache] = useState({});

    useEffect(() => {
        const fetchJobs = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'jobs'));
            const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Extract unique company IDs
            const uniqueCompanyIDs = [...new Set(jobsData.map(job => job.companyID).filter(id => id))];

            // Fetch all companies data and create a cache
            const companyDocsPromises = uniqueCompanyIDs.map(companyID => getDoc(doc(firestore, 'companies', companyID)));
            const companyDocs = await Promise.all(companyDocsPromises);
            const companiesCache = companyDocs.reduce((acc, doc) => {
                if (doc.exists()) {
                    acc[doc.id] = doc.data().companyName;
                }
                return acc;
            }, {});

            // Update jobs with company names from cache
            const jobsWithCompanyNames = jobsData.map(job => ({
                ...job,
                companyName: companiesCache[job.companyID] || "Unknown Company"
            }));

            setJobs(jobsWithCompanyNames);
            setCompaniesCache(companiesCache); // Optional: set cache state if needed later
        };

        fetchJobs();
    }, []);

    return (
        <div className="cards-container">
            {jobs.map((job) => (
                <div key={job.id} className="card">
                    <img src={job.jobPicture || "https://placehold.co/300x200"} alt="Job Image" className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="content">
                        <div className="header">
                            <div className="flex items-center">
                                <img src="https://placehold.co/40" alt="Profile Photo" className="w-8 h-8 rounded-full mr-2" />
                                <span className="title">{job.companyName || "Company Name"}</span>
                            </div>
                            <span className="text-jt">{job.jobType || "Salary Type"}</span>
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
