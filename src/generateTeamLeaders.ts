(function(){

  const fs = require('fs');
  const teamsArray = require('./teamsArray');

  (function generateTeamLeadersFile() {

    const [teamsAndLeaders, departmentsAndHeads] = getTeamsAndLeaders(teamsArray);
    const teamLeadersFileContent = teamsAndLeaders.join('\n');
    const departmentsAndHeadsFileContent = departmentsAndHeads.join('\n');


    // Generate team leaders file
    fs.writeFile('teamLeaders.txt', teamLeadersFileContent, 'utf-8', (err: any) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Teams file created successfully!');
      }
    });

    // Generate heads of department file
    fs.writeFile('departments.txt', departmentsAndHeadsFileContent, 'utf-8', (err: any) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Departments file created successfully!');
      }
    });

  })();

  function getTeamsAndLeaders(teamsArray: Team[]): string[][] {
    const teamsAndLeaders = new Map();
    const departmentAndHeads = new Map();

    teamsArray.forEach(team => {
      const teamName = getTeamNameFromId(team.id);

      teamsAndLeaders.set(teamName, team.pid);

      if (team.tags.includes('department')) {
        departmentAndHeads.set(teamName, team.pid);
      }
    });
    console.log('chefs', teamsAndLeaders);
    console.log('department heads ', departmentAndHeads);
    const teamsAndLeadersList = Array.from(teamsAndLeaders).map(([team, leader]) => `${team}: ${leader}`);
    const departmentAndHeadsList = Array.from(departmentAndHeads).map(([department, head]) => `${department}: ${head}`);
    return [teamsAndLeadersList, departmentAndHeadsList];
  }

  function getTeamNameFromId(id: string): string {
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
})()