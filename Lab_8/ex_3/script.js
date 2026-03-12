// 1. Define the Course class
class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    // Method to display the course details
    displayCourse() {
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }
}

// 2. Instantiate (create) a new course object
let course1 = new Course("Web Technologies", "Dr. S. Gopikrishnan");

// 3. Call the method to show details
course1.displayCourse();

// 4. Implement a Promise to simulate enrollment logic
let enrollCourse = new Promise((resolve, reject) => {
    // This variable simulates a real-world check (e.g., from a database)
    let seatsAvailable = false;

    if (seatsAvailable) {
        resolve("Enrollment Successful");
    } else {
        reject("Course Full");
    }
});

// 5. Handle the Promise results
enrollCourse
    .then(msg => console.log(msg))   // Runs if resolve() is called
    .catch(err => console.log(err)); // Runs if reject() is called