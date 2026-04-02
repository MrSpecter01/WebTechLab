import React from 'react';
import './StudentProfile.css';

const StudentProfile = () => {
  const student = {
    name: "Anand Kumar V",
    dept: "Computer Science",
    year: "3rd Year",
    section: "A"
  };

  return (
    <div className="profile-card">
      <h1>Student Profile</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Department:</strong> {student.dept}</p>
      <p><strong>Year:</strong> {student.year}</p>
      <p><strong>Section:</strong> {student.section}</p>
    </div>
  );
};

export default StudentProfile;