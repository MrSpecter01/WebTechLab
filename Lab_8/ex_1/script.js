// 1. Declare variables using 'let'
let studentName = "Anil";
let mark1 = 91;
let mark2 = 92;
let mark3 = 93;

// 2. Use an arrow function to compute the average
// We use 'const' here because the function logic doesn't change
const calculateAverage = (m1, m2, m3) => {
    return (m1 + m2 + m3) / 3;
};

// 3. Calculate the total and average
let totalMarks = mark1 + mark2 + mark3;
let average = calculateAverage(mark1, mark2, mark3);

// 4. Display result using Template Literals (the backtick ` syntax)
console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${average.toFixed(2)}`);