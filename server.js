const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 2024;

const credentials = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

app.get('/parsePeople', (req, res) => {
    const peopleFolderPath = path.join(__dirname, 'people');
    try {
        fs.readdir(peopleFolderPath, (error, peopleFolders) => {
            const peopleData = [];
            let count = 0;
            const numberOfPersons = Object.keys(peopleFolders).length;
            for (const personFolder of peopleFolders) {
                const personFolderPath = path.join(peopleFolderPath, personFolder);
                const ficheFilePath = path.join(personFolderPath, 'fiche.txt');
                try {
                    fs.readFile(ficheFilePath, 'utf-8', (err, ficheContent) => {
                        console.log(ficheContent)
                        const personData = ficheContent
                        .split('\n')
                        .map(line => line.split(': '))
                        .reduce((acc, [key, value]) => {
                                acc[key.toLowerCase()] = value.trim();
                                return acc;
                        }, {});

                        peopleData.push(personData);
                        count++;
                        if (count === numberOfPersons) {
                            console.log('data', peopleData);
                            res.json(peopleData);
                        }
                    });
                } catch (error) {
                    console.error(`Error reading fiche file for ${personFolder}: ${error.message}`);
                }
            }

        });
    } catch (error) {
            console.error(`Error reading people folder: ${error.message}`);
            res.status(500).send('Internal Server Error');
    }
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});