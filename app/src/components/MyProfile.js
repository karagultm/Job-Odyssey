import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/MyProfile.css';

const MyProfile = ({ refreshNavbar }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    location: '',
    aboutMe: '',
    skills: '',
    salaryExpectation: '',
    phoneNumber: '',
    nationalId: '',
    nationality: '',
    birthDate: '',
    gender: '',
    birthLocation: '',
    driversLicense: '',
    militaryStatus: '',
    searchingNewOpportunities: false,
    schoolInternshipMatch: false,
  });

  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [volunteerExperience, setVolunteerExperience] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPersonalInfo({ ...personalInfo, [name]: checked });
    } else {
      setPersonalInfo({ ...personalInfo, [name]: value });
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(firestore, 'applicants', user.uid);
        await updateDoc(docRef, {
          personalInfo,
          education,
          workExperience,
          volunteerExperience,
          languages,
          courses,
          certifications
        });
        toast.success('Profile updated successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error updating profile: ', error);
        toast.error(error.message);
      }
    } else {
      toast.error('No user is logged in');
    }
  };

  return (
    <div className="my-profile">
      <h2>My Profile</h2>
      <form onSubmit={handleSaveProfile}>
        <h3>Personal Information</h3>
        <label>
          Name
          <input type="text" name="name" value={personalInfo.name} onChange={handleInputChange} required />
        </label>
        <label>
          Surname
          <input type="text" name="surname" value={personalInfo.surname} onChange={handleInputChange} required />
        </label>
        <label>
          Location
          <input type="text" name="location" value={personalInfo.location} onChange={handleInputChange} required />
        </label>
        <label>
          About Me
          <textarea name="aboutMe" value={personalInfo.aboutMe} onChange={handleInputChange} required />
        </label>
        <label>
          Skills
          <input type="text" name="skills" value={personalInfo.skills} onChange={handleInputChange} required />
        </label>
        <label>
          Salary Expectation
          <input type="number" name="salaryExpectation" value={personalInfo.salaryExpectation} onChange={handleInputChange} required />
        </label>
        <label>
          Phone Number
          <input type="tel" name="phoneNumber" value={personalInfo.phoneNumber} onChange={handleInputChange} required />
        </label>
        <label>
          National ID
          <input type="text" name="nationalId" value={personalInfo.nationalId} onChange={handleInputChange} required />
        </label>
        <label>
          Nationality
          <input type="text" name="nationality" value={personalInfo.nationality} onChange={handleInputChange} required />
        </label>
        <label>
          Birth Date
          <input type="date" name="birthDate" value={personalInfo.birthDate} onChange={handleInputChange} required />
        </label>
        <label>
          Gender
          <input type="text" name="gender" value={personalInfo.gender} onChange={handleInputChange} required />
        </label>
        <label>
          Birth Location
          <input type="text" name="birthLocation" value={personalInfo.birthLocation} onChange={handleInputChange} required />
        </label>
        <label>
          Driver's License
          <input type="text" name="driversLicense" value={personalInfo.driversLicense} onChange={handleInputChange} required />
        </label>
        <label>
          Military Status
          <input type="text" name="militaryStatus" value={personalInfo.militaryStatus} onChange={handleInputChange} required />
        </label>
        <label>
          Are you searching for new opportunities?
          <input type="checkbox" name="searchingNewOpportunities" checked={personalInfo.searchingNewOpportunities} onChange={handleInputChange} />
        </label>
        <label>
          Does school correspond to your internship?
          <input type="checkbox" name="schoolInternshipMatch" checked={personalInfo.schoolInternshipMatch} onChange={handleInputChange} />
        </label>

        <h3>Educational Information</h3>
        <button type="button" onClick={() => setEducation([...education, { university: '', startDate: '', endDate: '', gpa: '' }])}>Add Education</button>
        {education.map((edu, index) => (
          <div key={index}>
            <label>
              University
              <input type="text" value={edu.university} onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].university = e.target.value;
                setEducation(newEducation);
              }} required />
            </label>
            <label>
              Start Date
              <input type="date" value={edu.startDate} onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].startDate = e.target.value;
                setEducation(newEducation);
              }} required />
            </label>
            <label>
              End Date
              <input type="date" value={edu.endDate} onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].endDate = e.target.value;
                setEducation(newEducation);
              }} required />
            </label>
            <label>
              GPA
              <input type="number" value={edu.gpa} onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].gpa = e.target.value;
                setEducation(newEducation);
              }} required />
            </label>
          </div>
        ))}

        <h3>Work Experience</h3>
        <button type="button" onClick={() => setWorkExperience([...workExperience, { companyName: '', jobTitle: '', startDate: '', endDate: '', jobDescription: '' }])}>Add Work Experience</button>
        {workExperience.map((work, index) => (
          <div key={index}>
            <label>
              Company Name
              <input type="text" value={work.companyName} onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].companyName = e.target.value;
                setWorkExperience(newWorkExperience);
              }} required />
            </label>
            <label>
              Job Title
              <input type="text" value={work.jobTitle} onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].jobTitle = e.target.value;
                setWorkExperience(newWorkExperience);
              }} required />
            </label>
            <label>
              Start Date
              <input type="date" value={work.startDate} onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].startDate = e.target.value;
                setWorkExperience(newWorkExperience);
              }} required />
            </label>
            <label>
              End Date
              <input type="date" value={work.endDate} onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].endDate = e.target.value;
                setWorkExperience(newWorkExperience);
              }} required />
            </label>
            <label>
              Job Description
              <textarea value={work.jobDescription} onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].jobDescription = e.target.value;
                setWorkExperience(newWorkExperience);
              }} required />
            </label>
          </div>
        ))}

        <h3>Volunteer Experience</h3>
        <button type="button" onClick={() => setVolunteerExperience([...volunteerExperience, { organizationName: '', role: '', startDate: '', endDate: '', description: '' }])}>Add Volunteer Experience</button>
        {volunteerExperience.map((vol, index) => (
          <div key={index}>
            <label>
              Organization Name
              <input type="text" value={vol.organizationName} onChange={(e) => {
                const newVolunteerExperience = [...volunteerExperience];
                newVolunteerExperience[index].organizationName = e.target.value;
                setVolunteerExperience(newVolunteerExperience);
              }} required />
            </label>
            <label>
              Role
              <input type="text" value={vol.role} onChange={(e) => {
                const newVolunteerExperience = [...volunteerExperience];
                newVolunteerExperience[index].role = e.target.value;
                setVolunteerExperience(newVolunteerExperience);
              }} required />
            </label>
            <label>
              Start Date
              <input type="date" value={vol.startDate} onChange={(e) => {
                const newVolunteerExperience = [...volunteerExperience];
                newVolunteerExperience[index].startDate = e.target.value;
                setVolunteerExperience(newVolunteerExperience);
              }} required />
            </label>
            <label>
              End Date
              <input type="date" value={vol.endDate} onChange={(e) => {
                const newVolunteerExperience = [...volunteerExperience];
                newVolunteerExperience[index].endDate = e.target.value;
                setVolunteerExperience(newVolunteerExperience);
              }} required />
            </label>
            <label>
              Description
              <textarea value={vol.description} onChange={(e) => {
                const newVolunteerExperience = [...volunteerExperience];
                newVolunteerExperience[index].description = e.target.value;
                setVolunteerExperience(newVolunteerExperience);
              }} required />
            </label>
          </div>
        ))}

        <h3>Foreign Language Skills</h3>
        <button type="button" onClick={() => setLanguages([...languages, { language: '', proficiency: '', learnedWhere: '' }])}>Add Language</button>
        {languages.map((lang, index) => (
          <div key={index}>
            <label>
              Language
              <input type="text" value={lang.language} onChange={(e) => {
                const newLanguages = [...languages];
                newLanguages[index].language = e.target.value;
                setLanguages(newLanguages);
              }} required />
            </label>
            <label>
              Proficiency Level
              <input type="text" value={lang.proficiency} onChange={(e) => {
                const newLanguages = [...languages];
                newLanguages[index].proficiency = e.target.value;
                setLanguages(newLanguages);
              }} required />
            </label>
            <label>
              Where Learned
              <input type="text" value={lang.learnedWhere} onChange={(e) => {
                const newLanguages = [...languages];
                newLanguages[index].learnedWhere = e.target.value;
                setLanguages(newLanguages);
              }} required />
            </label>
          </div>
        ))}

        <h3>Course Information</h3>
        <button type="button" onClick={() => setCourses([...courses, { courseName: '', timePeriod: '', description: '' }])}>Add Course</button>
        {courses.map((course, index) => (
          <div key={index}>
            <label>
              Course Name
              <input type="text" value={course.courseName} onChange={(e) => {
                const newCourses = [...courses];
                newCourses[index].courseName = e.target.value;
                setCourses(newCourses);
              }} required />
            </label>
            <label>
              Time Period
              <input type="text" value={course.timePeriod} onChange={(e) => {
                const newCourses = [...courses];
                newCourses[index].timePeriod = e.target.value;
                setCourses(newCourses);
              }} required />
            </label>
            <label>
              Description
              <textarea value={course.description} onChange={(e) => {
                const newCourses = [...courses];
                newCourses[index].description = e.target.value;
                setCourses(newCourses);
              }} required />
            </label>
          </div>
        ))}

        <h3>Certification Information</h3>
        <button type="button" onClick={() => setCertifications([...certifications, { certificationName: '', date: '' }])}>Add Certification</button>
        {certifications.map((cert, index) => (
          <div key={index}>
            <label>
              Certification Name
              <input type="text" value={cert.certificationName} onChange={(e) => {
                const newCertifications = [...certifications];
                newCertifications[index].certificationName = e.target.value;
                setCertifications(newCertifications);
              }} required />
            </label>
            <label>
              Date
              <input type="date" value={cert.date} onChange={(e) => {
                const newCertifications = [...certifications];
                newCertifications[index].date = e.target.value;
                setCertifications(newCertifications);
              }} required />
            </label>
          </div>
        ))}

        <button type="submit">Save Profile</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
