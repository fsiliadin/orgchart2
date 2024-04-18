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
                                    // should return only Yann Chevalier
                                    showPeopleWithoutBosses(peopleData)
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

function showPeopleWithoutBosses(peopleData) {
    setComputedData(peopleData);
    const idSet = new Set();

    // Iterate over the elements to populate the Set
    peopleData.forEach(element => {
        idSet.add(element.id);
    });

    // Array to store elements with parentId not matched by any id
    const unmatchedElements = [];

    // Check each element's parentId
    peopleData.forEach(element => {
        if (!idSet.has(element.parentId)) {
            unmatchedElements.push(element);
        }
    });

    // Output unmatched elements
    console.log("Elements with parentId not matched by any id:");
    console.log(unmatchedElements);
}


app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.status(404).send('File not found');
});

function setComputedData(peoples) {
    peoples.forEach(person => {
        const hash = crypto.createHash('sha256');
        person.email = `${person.firstname.trim().toLowerCase()}.${person.lastname.trim().toLowerCase()}@intersec.com`
        hash.update(person.email);
        person.id = hash.digest('hex');

        const hashNplusUn = crypto.createHash('sha256');
        hashNplusUn.update(`${person['n+1'].trim()}`);
        person.parentId = hashNplusUn.digest('hex');
    });
}

const httpsServer = https.createServer(credentials, app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
})


httpsServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});