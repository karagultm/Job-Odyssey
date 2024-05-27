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

        // Tüm alanların doldurulup doldurulmadığını kontrol edelim
        for (const key in jobData) {
            if (jobData[key] === '' || (Array.isArray(jobData[key]) && jobData[key].length === 0)) {
                alert('Please fill in all fields');
                return;
            }
        }

        try {
            await addDoc(collection(firestore, 'jobs'), jobData);
            alert('Job posted successfully!');
            navigate('/'); // İşlem başarılı olursa ana sayfaya yönlendirelim
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Ayı iki haneli hale getirir
        const day = String(today.getDate()).padStart(2, '0'); // Günü iki haneli hale getirir
        return `${year}-${month}-${day}`;
    };

    const getMaxDate = () => {
        const today = new Date();
        today.setMonth(today.getMonth() + 6);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Ayı iki haneli hale getirir
        const day = String(today.getDate()).padStart(2, '0'); // Günü iki haneli hale getirir
        return `${year}-${month}-${day}`;
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
                    required
                />
                <textarea
                    name="jobDescription"
                    placeholder="Job Description"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="jobType"
                    placeholder="Job Type"
                    value={jobData.jobType}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={jobData.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={jobData.department}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="applicationDeadline"
                    min={getCurrentDate()} // Tarih seçeneği için minimum değeri ayarlıyoruz
                    max={getMaxDate()} // Tarih seçeneği için maksimum değeri ayarlıyoruz
                    value={jobData.applicationDeadline}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="jobPicture"
                    placeholder="Job Picture URL"
                    value={jobData.jobPicture}
                    onChange={handleChange}
                    required
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
