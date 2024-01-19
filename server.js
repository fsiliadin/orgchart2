const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 2024;

const credentials = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/parsePeople', (req, res) => {
    const peopleFolderPath = path.join(__dirname, 'intersecAmazingPeople');
    try {
        fs.readFile(teamLeadersPath, 'utf-8', (err, teamLeaders) => {
            const teamsArray = teamLeaders.split('\n').map(line => {
                const [key, value] = line.split(':').map(item => item.trim());
                return { [key]: value };
            });
            fs.readdir(peopleFolderPath, (error, peopleFolders) => {
                const peopleData = [];
                let count = 0;
                const numberOfPersons = Object.keys(peopleFolders).length;
                for (const personFolder of peopleFolders) {
                    const personFolderPath = path.join(peopleFolderPath, personFolder);
                    const ficheFilePath = path.join(personFolderPath, 'fiche.txt');

                    fs.readdir(personFolderPath, (err, files) => {
                        const imageFile = files.find(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
                        let imagePath = '';
                        if (imageFile) {
                            imagePath = path.join(personFolderPath, imageFile).split('orgchart2/')[1];
                        } else {
                        console.log(`No image file found in ${personFolderPath}`);
                        }
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
                                personData.img = imagePath;
                                peopleData.push(personData);
                                count++;
                                if (count === numberOfPersons) {
                                    setComputedData(peopleData, teamsArray);
                                    console.log('data', peopleData);
                                    res.json(peopleData);
                                }
                            });
                        } catch (error) {
                            console.error(`Error reading fiche file for ${personFolder}: ${error.message}`);
                        }
                    })
                }

            });
        });
    } catch (error) {
            console.error(`Error reading people folder: ${error.message}`);
            res.status(500).send('Internal Server Error');
    }
});


app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.status(404).send('File not found');
});


function setComputedData(peoples, teamsArray) {
    peoples.forEach(person => {
        const hash = crypto.createHash('sha256');
        hash.update(`${person.firstname.trim()} ${person.lastname.trim()}`);
        person.id = hash.digest('hex');

        person['n+1'] = teamsArray[person.stpid.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')]
        const hashNplusUn = crypto.createHash('sha256');
        hashNplusUn.update(`${person['n+1'].trim()}`);
        person.parentId = hashNplusUn.digest('hex');

    });
}

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});