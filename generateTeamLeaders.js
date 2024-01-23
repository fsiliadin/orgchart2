const fs = require('fs');
const teamsArray = require('./teamsArray');

(function generateTeamLeadersFile() {

  // Create an object to store team leaders
  const teamLeaders = {};

  // Iterate over the array and populate the teamLeaders object
  teamsArray.forEach(team => {
    const teamName = team.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const teamLeader = team.pid;
    teamLeaders[teamName] = teamLeader;
  });

  // Convert the teamLeaders object into an array of strings
  const teamsList = Object.keys(teamLeaders).map(team => `${team}: ${teamLeaders[team]}`);

  // Write the teams list to the "teams" file
  fs.writeFile('teamLeaders.txt', teamsList.join('\n'), 'utf-8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Teams file created successfully!');
    }
  });
})();
