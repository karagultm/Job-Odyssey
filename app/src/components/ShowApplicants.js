import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import '../styles/ShowApplicants.css';

const ShowApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const jobDocRef = doc(firestore, 'jobs', jobId);
        const jobDoc = await getDoc(jobDocRef);

        if (jobDoc.exists()) {
          const jobData = jobDoc.data();
          const applicantIds = jobData.appliedApplications;

          const applicantsCollectionRef = collection(firestore, 'applicants');
          const q = query(applicantsCollectionRef, where('__name__', 'in', applicantIds));
          const querySnapshot = await getDocs(q);
          const applicantsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setApplicants(applicantsList);
        }
      } catch (error) {
        console.error('Error fetching applicants: ', error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div className="show-applicants">
      <h3>Applicants for Job ID: {jobId}</h3>
      {applicants.length > 0 ? (
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant.id}>
              <p><strong>Applicant ID:</strong> {applicant.id}</p>
              <p><strong>Name:</strong> {applicant.name}</p>
              <p><strong>Email:</strong> {applicant.email}</p>
              <p><strong>Resume:</strong> <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applicants found.</p>
      )}
    </div>
  );
};

export default ShowApplicants;
