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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
      }
      else {
        next();
      }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/parsePeople', (req, res) => {
    const peopleFolderPath = path.join(__dirname, 'intersecAmazingPeople');
    try {

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
                                console.log(ficheFilePath)
                                const personData = ficheContent
                                .split('\n')
                                .map(line => line.split(': '))
                                .reduce((acc, [key, value]) => {
                                        console.log(`${key} : ${value}`)
                                        acc[key.toLowerCase()] = value.trim();
                                        return acc;
                                }, {});
                                personData.img = imagePath;
                                peopleData.push(personData);
                                count++;
                                if (count === numberOfPersons) {
                                    // should return only Yann Chevalier
                                    // showPeopleWithoutBosses(peopleData)
                                    setComputedData(peopleData);
                                    testIdMatching(peopleData)
                                    res.json(peopleData);
                                }
                            });
                        } catch (error) {
                            console.error(`Error reading fiche file for ${personFolder}: ${error.message}`);
                        }
                    })
                }

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

function testIdMatching(peopleData) {
    const missMatchNumber = peopleData.reduce((acc, value) => {
        const hasMatch = peopleData.some(item => item.id === value.parentId)
        if (hasMatch) {
            return acc
        } else {
            return acc + 1
        }
    }, 0)
    console.log(`Nb of parentId with no matching id: ${missMatchNumber} / ${ peopleData.length }`)
}

function setComputedData(peoples) {
    peoples.forEach(person => {
        if(!person.email) {
            person.email = `${person.firstname.trim().toLowerCase()}.${person.lastname.trim().toLowerCase()}@intersec.com`
        }
        person.id = person.email

        person.parentId = person['n+1'];
    });
}

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});