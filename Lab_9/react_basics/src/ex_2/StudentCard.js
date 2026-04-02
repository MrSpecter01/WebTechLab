import React from 'react';
import './StudentCard.css';

// 'props' is an object containing all the data passed from the parent
const StudentCard = (props) => {
  return (
    <div className="student-card">
      <h3>{props.name}</h3>
      <p><strong>Department:</strong> {props.dept}</p>
      <p><strong>Marks:</strong> {props.marks}%</p>
    </div>
  );
};

export default StudentCard;