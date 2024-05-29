
(function() {
    const express = require('express');
    const fs = require('fs');
    const https = require('https');
    const path = require('path');
    const cypher = require('crypto');
    const app = express();
    const PORT = 2024;

    const credentials = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

app.use(express.static('front/dist/'))

app.get('/', (_req:any, res: any) => {
    res.sendFile(path.join(__dirname, 'front/dist/index.html'));
});

app.get('/parsePeople', (_req: any, res: any) => {
    try {
        parseWorkersFolder(res);
    } catch (error: any) {
        console.error(`Error reading people folder: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(__dirname));

app.use((_req: any, res: any, next: any) => {
    res.status(404).send('File not found');
});

const httpsServer = https.createServer(credentials, app);

app.use(function(req: any, res: any, next: any) {
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


type WorkerData = {
    id: string;
    parentId: string;
    firstname: string;
    lastname: string;
    position: string;
    email: string;
    "n+1": string;
    img: string;
    tags: string[];
}

function getImageInWorkerFolder(workerFolderFilesPath: string[], personFolderPath: string) {
    const imageFile = workerFolderFilesPath.find(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    let imagePath = '';

    if (imageFile) {
        imagePath = path.join(personFolderPath, imageFile).split('orgchart2/')[1];
    } else {
        console.log(`No image file found in ${personFolderPath}`);
    }
    return imagePath;
}

function parseWorkerData(workerFicheContent: string, image: string): WorkerData {
    const workerData: WorkerData = {
        id: '',
        parentId: '',
        firstname: '',
        lastname: '',
        position: '',
        email: '',
        "n+1": '',
        img: '',
        tags: []
    };

    workerFicheContent.split('\n')
    .map((line: string) => line.split(':'))
    .forEach((keyValuePair: string[]) => {
        switch(keyValuePair[0].trim()) {
            case 'firstname': workerData.firstname = keyValuePair[1].trim(); break;
            case 'lastname': workerData.lastname = keyValuePair[1].trim(); break;
            case 'position': workerData.position = keyValuePair[1].trim(); break;
            case 'email': workerData.email = keyValuePair[1].trim(); break;
            case 'n+1': workerData['n+1'] = keyValuePair[1].trim(); break;
            case 'img': workerData.img = keyValuePair[1].trim(); break;
            case 'tags': workerData.tags = keyValuePair[1].split(',').map((tag: string) => tag.trim()); break;
        }

    }, {});
    /*
    * We override the image property by the image file found in the user folder
    */
    if (image) {
        workerData.img = image;
    }
    return workerData;
}

function setComputedData(worker: WorkerData) {
    const hash = cypher.createHash('sha256');
    hash.update(worker.email);
    worker.id = hash.digest('hex');

    const hashNplusUn = cypher.createHash('sha256');
    hashNplusUn.update(`${worker['n+1']}`);
    if (worker['n+1'].length) {
        worker.parentId = hashNplusUn.digest('hex');
    } else {
        worker.parentId = '';
    }

    return worker;
}

function parseWorkersFolder(res: any) {
    const peopleFolderPath = path.join(__dirname, 'intersecAmazingPeople');

    fs.readdir(peopleFolderPath, (error: NodeJS.ErrnoException | null, peopleFolders: File[]) => {
        const workersData: WorkerData[] = [];
        let count = 0;
        const numberOfPersons = Object.keys(peopleFolders).length;

        for (const workerFolder of peopleFolders) {
            const personFolderPath = path.join(peopleFolderPath, workerFolder);
            const ficheFilePath = path.join(personFolderPath, 'fiche.txt');

            fs.readdir(personFolderPath, (err: NodeJS.ErrnoException | null, workerFolderFilesPath: string[]) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const image = getImageInWorkerFolder(workerFolderFilesPath, personFolderPath);

                try {
                    (function buildWorkerData() {
                        fs.readFile(ficheFilePath, 'utf-8', (err: NodeJS.ErrnoException | null, ficheContent: string) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            let worker: WorkerData = parseWorkerData(ficheContent, image);
                            worker = setComputedData(worker);
                            workersData.push(worker);
                            count++;
                            if (count === numberOfPersons) {
                                showPeopleWithoutBosses(workersData)
                                res.json(workersData);
                            }
                        });
                    })();
                } catch (error: any) {
                    console.error(`Error reading fiche file for ${workerFolder}: ${error.message}`);
                }
            })
        }
    });
}

function showPeopleWithoutBosses(workersData: WorkerData[]) {
    const idSet = new Set();

    workersData.forEach(element => {
        idSet.add(element.id);
    });

    const unmatchedElements: any = [];

    workersData.forEach(element => {
        if (!idSet.has(element.parentId)) {
            unmatchedElements.push(element);
        }
    });

    // Output unmatched elements
    console.log("Elements with parentId not matched by any id:");
    console.log(unmatchedElements);
}
})()