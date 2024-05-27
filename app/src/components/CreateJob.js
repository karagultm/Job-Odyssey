import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase'; // Güncellenmiş import yolu
import '../styles/CreateJob.css'; // CSS dosyasını import edelim

const CreateJob = () => {
    const [jobData, setJobData] = useState({
        jobName: '',
        jobDescription: '',
        jobType: '',
        location: '',
        department: '',
        applicationDeadline: '',
        jobPicture: '',
        qualifications: [],
    });

    const [qualificationInput, setQualificationInput] = useState('');
    const navigate = useNavigate(); // useNavigate kancasını kullanarak navigasyonu sağlayalım

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleQualificationAdd = () => {
        setJobData({
            ...jobData,
            qualifications: [...jobData.qualifications, qualificationInput],
        });
        setQualificationInput('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(firestore, 'jobListings'), jobData);
            alert('Job posted successfully!');
            navigate('/'); // İşlem başarılı olursa ana sayfaya yönlendirelim
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <div className="create-job">
            <h2>Create Job</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="jobName"
                    placeholder="Job Name"
                    value={jobData.jobName}
                    onChange={handleChange}
                />
                <textarea
                    name="jobDescription"
                    placeholder="Job Description"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="jobType"
                    placeholder="Job Type"
                    value={jobData.jobType}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={jobData.location}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={jobData.department}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="applicationDeadline"
                    value={jobData.applicationDeadline}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="jobPicture"
                    placeholder="Job Picture URL"
                    value={jobData.jobPicture}
                    onChange={handleChange}
                />
                <div>
                    <input
                        type="text"
                        value={qualificationInput}
                        onChange={(e) => setQualificationInput(e.target.value)}
                        placeholder="Add a qualification"
                    />
                    <button type="button" onClick={handleQualificationAdd}>
                        Add
                    </button>
                </div>
                <ul>
                    {jobData.qualifications.map((q, index) => (
                        <li key={index}>{q}</li>
                    ))}
                </ul>
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreateJob;
