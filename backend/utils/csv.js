const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('top-100-livre.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log('CSV Data:', results);

        fs.writeFile('data.json', JSON.stringify(results, null, 2), (err) => {
            if (err) {
                console.error('Error write Json:', err);
            } else {
                console.log('Ok Json');
            }
        });
    })
    .on('error', (error) => {
        console.error('Error reading CSV:', error);
    });
