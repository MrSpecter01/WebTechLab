// 1. Define the student object
const student = {
    id: 8551,
    name: "Anil",
    department: "CSE",
    marks: 92
};

// 2. Use Object Destructuring to extract values
const { id, name, department, marks } = student;

// 3. Display the extracted values
console.log(id, name, department, marks);

// 4. Determine the grade based on marks
let studentGrade = marks >= 90 ? "A" : "B";

// 5. Create a new object using the Spread Operator
const updatedStudent = {
    ...student,
    grade: studentGrade
};

// 6. Display the updated object
console.log(updatedStudent);