const fs = require('fs');

const fileName = 'test.txt';

function runFileExercise() {
    // 1. Create/Write a file
    fs.writeFile(fileName, 'Hello, this is the initial content.', (err) => {
        if (err) return console.error('Error writing file:', err);
        console.log('1. File created successfully.');

        // 2. Read the file
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) return console.error('Error reading file:', err);
            console.log('2. File content read:', data);

            // 3. Append data to the file
            fs.appendFile(fileName, '\nThis content was appended later.', (err) => {
                if (err) return console.error('Error appending file:', err);
                console.log('3. Data appended successfully.');

                // 4. Read again to see the change
                fs.readFile(fileName, 'utf8', (err, newData) => {
                    if (err) return console.error('Error reading updated file:', err);
                    console.log('4. Updated content:\n', newData);

                    // 5. Delete the file
                    fs.unlink(fileName, (err) => {
                        if (err) return console.error('Error deleting file:', err);
                        console.log('5. File deleted successfully. Cleanup complete.');
                    });
                });
            });
        });
    });
}

module.exports = runFileExercise;