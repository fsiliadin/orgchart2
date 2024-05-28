(function(){

  const fs = require('fs');
  const path = require('path');
  const workers = require('./workers');

  createWorkersFolder(workers.filter((worker: ICWorker | Head) => {
    /*
     * Check if the worker id is actually an intersec email
     */
   // TODO: do a better check
   return worker.id.includes('@intersec.com');
  }));

  function parseTeamsAndLeaders(teamsAndLeadersFileContent: string, teamsAreDepartments?: boolean) {
    const teamsAndLeaders = new Map;
    teamsAndLeadersFileContent.split('\n').forEach(line => {
      const [team, leader] = line.split(':').map(item => item.trim());
      if (!teamsAreDepartments) {
        teamsAndLeaders.set(team, leader);
      } else {
        teamsAndLeaders.set(leader, team);
      }
    });
    return teamsAndLeaders;
  }

  function getIntersecFolder() {
    const intersecFolder = path.join(__dirname, '../intersecAmazingPeople');
    if (!fs.existsSync(intersecFolder)) {
      fs.mkdirSync(intersecFolder);
    }
    return intersecFolder;
  }

  function decomposeString(composedString: string, joinChar: string) {
    const stringIsActuallyComposed = composedString.split('-').length > 1;
    if (!stringIsActuallyComposed) {
      return composedString.charAt(0).toUpperCase() + composedString.slice(1);
    } else {
      return composedString.split('-').map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`).join(joinChar);
    }
  }

  function getWorkerNameFromId(id: string) /* The id is an email */ {
    /*
    * We assume the worker email is <firstname>.<lastname>@intersec.com
    */
   return id.split('@')[0].split('.').map((name) => {
     return decomposeString(name, '-')
    }).join(' ')
  }

  function createdWorkerFolder(name: string) {
    const intersecFolder = getIntersecFolder();
    const workerFolder = path.join(intersecFolder, name);

    if (!fs.existsSync(workerFolder)) {
      fs.mkdirSync(workerFolder);
    }
    return workerFolder;
  }

  function getNPlus1Object(worker: ICWorker | Head, teams: Map<string, string>): ICWorker {
    const nPlus1Id = teams.get(decomposeString(worker.stpid, ' '))
    const nPlus1Object = workers.filter((worker:ICWorker) => {
      return worker.id === nPlus1Id;
    })[0];
    return nPlus1Object;
  }

  function getDepartment(worker: ICWorker | Head, icTeams: IntersecTeams) {
    let department: string = '';
    if ('isHeadOfDepartment' in worker) {
      if(!worker.isHeadOfDepartment) {
        // In this block worker is not a head of department

        /* If the worker is not head of department but is
        * on top of the game aka Yann Chevalier anyway
        */
       if (!worker.stpid) {
         return '';
        } else {
          getDepartment(getNPlus1Object(worker, icTeams.teams), icTeams);
        }
      } else {
        const head = worker.id;
        const headName = decomposeString(head, ' ');
        department = icTeams.departments.get(headName) ?? '';
      }
    } else {
      // In this block worker is not a head of department

      /* If the worker is not head of department but is
      * on top of the game aka Yann Chevalier anyway
      */
     if (!worker.stpid) {
       return '';
      } else {
        getDepartment(getNPlus1Object(worker, icTeams.teams), icTeams);
      }
    }
    return department;
  }

  function buildWorkerFileContent(worker: ICWorker | Head, icTeams: IntersecTeams) {
    /*
    * We use decomposeString on worker.stpid because its format in the object is
    * in kebab case "that-team". While in the teams Map which comes from a human readable
    * file it's in this format "That Team"
    */
   const nPlus1 = icTeams.teams.get(decomposeString(worker.stpid, ' ')) ?? 'God';
   const [firstname, lastname] = getWorkerNameFromId(worker.id).split(' ');
   const department = getDepartment(worker, icTeams);
   const fileContent = `
   firstname: ${firstname}\n
   lastname: ${lastname}\n
   position: ${worker.title.trim()}\n
   email: ${worker.id.trim()}\n
   n+1: ${nPlus1}\n
   img: ${worker.img}\n
   department: ${department}\n
   tags: ${(worker.tags?.join(' ')) ?? ''}
   `;

   return fileContent;
  }

  function updateWorkerFolder(worker: ICWorker | Head, icTeams: IntersecTeams) {

    worker.name = getWorkerNameFromId(worker.id);
    const workerFolder = createdWorkerFolder(worker.name);
    const ficheFilePath = path.join(workerFolder, 'fiche.txt');
    const workerFileContent = buildWorkerFileContent(worker, icTeams);
    fs.writeFileSync(ficheFilePath, workerFileContent);
  }

  type IntersecTeams = {
    teams: Map<string, string>;
    departments: Map<string, string>;
  }

  function createWorkersFolder(workers: ICWorker[] | Head[]) {
    const teamsAndLeadersFile = path.join(__dirname, '../teamLeaders.txt');
    const departmentsAndHeads = path.join(__dirname, '../departments.txt');
    fs.readFile(departmentsAndHeads, 'utf-8', (err: any, departmentsAndHeadsFileContent: string) => {

      if (err) {
        console.error(err);
        return;
      }
      let departments = parseTeamsAndLeaders(departmentsAndHeadsFileContent, true);
      fs.readFile(teamsAndLeadersFile, 'utf-8', (err: any, teamsAndLeadersFileContent: string) => {
        if (err) {
          console.error(err);
          return;
        }

        let teams = parseTeamsAndLeaders(teamsAndLeadersFileContent);
        workers.forEach(worker => {
          updateWorkerFolder(worker, {teams, departments});
        });
        console.log('Team folders and files created successfully!');
      });
    });
  }

})()