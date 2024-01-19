const fs = require('fs');
const path = require('path');

(function generateTeamLeadersFile() {

  const teamsArray = [
    { id: 'po', pid: 'kamal', name: 'Product Owner', tags: ['team']},
    { id: 'data-science', pid: 'cuny', name: 'Data Science', tags: ['team']},
    { id: 'bogops', pid: 'jean-marc.coic@intersec.com', name: 'DevOps', tags: ['team']},
    { id: 'transverse', pid: 'kamal', name: 'Transverse', tags: ['team']},
    { id: 'engineering', pid: 'moha', name: 'Engineering', tags: ['team']},
    { id: 'palladium', pid: 'alexis', name: 'Palladium', tags: ['team']},
    { id: 'cobalt', pid: 'nassim.mnafeg', name: 'Cobalt', tags: ['team']},
    { id: 'telco', pid: 'rawad', name: 'Telco', tags: ['team']},
    { id: 'doc', pid: 'christele', name: 'Doc', tags: ['team']},
    { id: 'sa-team', pid: 'nicolas.najman@intersec.com', name: 'Solution Architects', tags: ['team']},
    { id: 'ps-europe', pid: 'emilien.coffin@intersec.com', name: 'Europe', tags: ['team']},
    { id: 'ps-eeme-program', pid: 'haytham.beshir@intersec.com', name: 'Middle East Program', tags: ['team']},
    { id: 'ps-eeme-project', pid: 'neeraj', name: 'Middle East Project', tags: ['team']},
    { id: 'ps-americas', pid: 'matthias.granger@intersec.com', name: 'Americas', tags: ['team']},
    { id: 'ps-tiger', pid: 'mohit.maheshwari@intersec.com', name: 'Tiger Program', tags: ['team']},
    { id: 'ps-support', pid: 'onur.topcu@intersec.com', name: 'Support', tags: ['team']},
    { id: 'ps-tq', pid: 'simon.ravier@intersec.com', name: 'Integration Quality', tags: ['team']},
    { id: 'tunis-team', pid: 'mohit.maheshwari@intersec.com', name: 'Sofrecom', tags: ['team']},
    { id: 'sales-eu', pid: 'arnaud.westphal@intersec.com', name: 'Sales Europe', tags: ['team']},
    { id: 'presales-eu', pid: 'ingolf.ruh@intersec.com', name: 'Pre Sales Europe', tags: ['team']},
    { id: 'sdr', pid: 'ingolf.ruh@intersec.com', name: 'Sales Development Representative', tags: ['team']},
    { id: 'sales-eeme', pid: 'ahmed.hamza@intersec.com', name: 'Sales Eeme', tags: ['team']},
    { id: 'presales-eeme', pid: 'ingolf.ruh@intersec.com', name: 'Pre Sales Eeme', tags: ['team']},
    { id: 'sales-americas', pid: 'ingolf.ruh@intersec.com', name: 'Sales Americas', tags: ['team']},
    { id: 'presales-americas', pid: 'ingolf.ruh@intersec.com', name: 'Pre Sales Americas', tags: ['team']},
    { id: 'sales-apac', pid: 'ingolf.ruh@intersec.com', name: 'Sales Apac', tags: ['team']},
    { id: 'presales-apac', pid: 'ingolf.ruh@intersec.com', name: 'Pre Sales Apac', tags: ['team']},
    { id: 'rd-team', pid: 'jean-marc.coic@intersec.com', tags: ['department', 'rd-team'], name: 'R&D' },
    { id: 'sales-team', pid: 'ingolf.ruh@intersec.com', tags: ['department', 'sales-team'], name: 'Revenue' },
    { id: 'pdm-team', pid: 'christophe.nez@intersec.com', tags: ['department', 'pdm-team'], name: 'Product' },
    { id: 'ps-team', pid: 'mohit.maheshwari@intersec.com', tags: ['department', 'ps-team'], name: 'Professional Services' },
    { id: 'accounting', pid: 'nicolas.rousseau-dumarcet@intersec.com', tags: ['department', 'accounting'], name: 'Accounting' },
    { id: 'finance', pid: 'caroline.dumaitre@intersec.com', tags: ['department', 'accounting'], name: 'Accounting' },
    { id: 'it-team', pid: 'clement', tags: ['department', 'it-team'], name: 'IT & Cloud Operations' },
    { id: 'hr-team', pid: 'oyo.ndoro@intersec.com', tags: ['department', 'hr-team'], name: 'HR' },
    { id: 'hr-recrutement', pid: 'oyo.ndoro@intersec.com', tags: ['department', 'hr-team'], name: 'HR' },
    { id: 'hr-administration', pid: 'oyo.ndoro@intersec.com', tags: ['department', 'hr-team'], name: 'HR' },
    { id: 'mkt-team', pid: 'cardona', tags: ['department', 'mkt-team'], name: 'Marketing' },
    { id: 'intersec', pid: 'yann.chevalier@intersec.com', tags: ['company'], name: 'Intersec' },
  ];

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


function createWorkersFolder(dataArray) {

  const teamLeadersPath = path.join(__dirname, 'teamLeaders.txt');
  fs.readFile(teamLeadersPath, 'utf-8', (err, teamLeaders) => {
    let teams = {};
    teamLeaders.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        teams[key] = value;
    });

    const teamFolderPath = path.join(__dirname, 'intersecAmazingPeople');
    if (!fs.existsSync(teamFolderPath)) {
      fs.mkdirSync(teamFolderPath);
    }

    // Loop through the array and create folders and text files
    dataArray.forEach(member => {
      const memberFolderName = member.name;
      const memberFolderPath = path.join(teamFolderPath, memberFolderName);

      // Create member folder
      if (!fs.existsSync(memberFolderPath)) {
        fs.mkdirSync(memberFolderPath);
      }

      let stpidParsed ;
      console.log('avant ', member.stpid);
      if(member.stpid.split('-').length === 1) {
        stpidParsed = member.stpid.charAt(0).toUpperCase() + member.stpid.slice(1);
      } else {
        stpidParsed = member.stpid.split('-').map((s) => `${s.charAt(0).toUpperCase() + s.slice(1)}`).join(' ');
      }

      const ficheFilePath = path.join(memberFolderPath, 'fiche.txt');
      const fileContent = `firstname: ${member.name.split(' ')[0]}\n` +
                          `lastname: ${member.name.split(' ').pop()}\n` +
                          `position: ${member.title}\n` +
                          `n+1: ${teams[stpidParsed]}\n` +
                          `img: ${member.img}\n` +
                          `tags: ${(member.tags && member.tags.join(' ')) ?? ''}`;


      fs.writeFileSync(ficheFilePath, fileContent);
    });

    console.log('Team folders and files created successfully!');
  });
}

// Example array
const workers = [
    /* }}} */
    /* {{{ CEO */

    { id: 'yann.chevalier@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: '', tags: ['management'], name: 'Yann Chevalier', title: 'CEO', img: 'assets/photos/CHEVALIER.Yann.jpg' },

    /* }}} */
    /* {{{ Marketing */

    { id: 'cardona', pid: 'yann.chevalier@intersec.com', stpid: 'intersec', tags: ['management'], name: 'Charlotte Cardona', title: 'Marketing & Communication Director', img: 'assets/photos/Cardona.Charlotte.png'},
    { id: 'thomas.grahamwood', pid: 'cardona', name: 'Thomas Graham-Wood', stpid: 'mkt-team', title: 'Marketing and Communication Specialist', img: 'assets/photos/Thomas_GRAHAM-WOOD.jpg'},
    { id: 'marie-luna', pid: 'cardona', name: 'Marie-Luna Gonzalez', stpid: 'mkt-team', title: 'Marketing and Social Networking Apprentice', img: 'assets/photos/Marie.Luna.Gonzalez.jpg'},

    /* }}} */
    /* {{{ PDM */

    { id: 'christophe.nez@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'intersec', tags: ['management'], name: 'Christophe Nez', title: 'VP Product Marketing', img: 'assets/photos/NEZ.christophe.png'},
    { id: 'charlotte.thomas', pid: 'christophe.nez@intersec.com', stpid: 'pdm-team', name: 'Charlotte Thomas', title: 'Cloud Offering Director', img: 'assets/photos/Charlotte_THOMAS.jpg'},
    { id: 'sebastien.synold', pid: 'christophe.nez@intersec.com', stpid: 'pdm-team', name: 'Sebastien Synold', title: 'Product Manager', img: 'assets/photos/Sebastien_SYNOLD.jpg'},

    /* }}} */
    /* {{{ R&D */

    /* Head */
    { id: 'jean-marc.coic@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'intersec', tags: ['management'], name: 'Jean-Marc Coic', title: 'CTO', img: 'assets/photos/COIC.Jean-Marc.jpg'},
    { id: 'kamal', pid: 'jean-marc.coic@intersec.com', tags: ['management'], name: 'Kamal Fadlaoui', stpid: 'rd-team', title: 'VP Engineering', img: 'assets/photos/Fadlaoui.Kamal.jpg'},
    { id: 'moha', pid: 'jean-marc.coic@intersec.com', tags: ['management'], name: 'Mohamed Kahlal', stpid: 'rd-team', title: 'VP Engineering Delivery', img: 'assets/photos/KAHLAL.mohamed.png'},


    /* PO */
    { id: 'mas', pid: 'kamal', stpid: 'po', name: 'Vincent Mas', title: 'Product Owner', img: 'assets/photos/Mas.Vincent.png'},
    { id: 'yohann', pid: 'kamal', stpid: 'po', name: 'Yohann Balawender', title: 'Product Owner', img: 'assets/photos/Balawander.Yohann.jpg'},
    { id: 'marwane', pid: 'kamal', stpid: 'po', name: 'Marwane Akram', title: 'Product Owner', img: 'assets/photos/AKRAM.Marwane.jpg'},
    { id: 'amer', pid: 'kamal', stpid: 'po', name: 'Amer Bdeoui', title: 'Product Owner', img: 'assets/photos/Bdoui.Amer.png'},
    { id: 'alex.slavutskyi@intersec.com', pid: 'kamal', stpid: 'po', name: 'Alex Slavutskyi', title: 'UX/UI Designer', img: 'assets/photos/Alex.Slavutskyi.jpg'},

    /* Data Science */
    { id: 'cuny', pid: 'jean-marc.coic@intersec.com', stpid: 'rd-team', name: 'Pierre-Louis Cuny', title: 'Data Science Team Lead', img: 'assets/photos/CUNY.Pierre-Louis.jpg'},
    { id: 'gosset', pid: 'cuny', stpid: 'data-science', name: 'Christophe Gosset', title: 'Data Scientist', img: 'assets/photos/Gosset.Christophe.jpg'},
    { id: 'killian', pid: 'cuny', stpid: 'data-science', name: 'Killian Le Goff', title: 'Data Scientist', img: 'assets/photos/Killian_LeGoff.jpg'},

    /* BogOps */
    { id: 'marchand', pid: 'jean-marc.coic@intersec.com', stpid: 'bogops', name: 'Fabien Marchand', title: 'DevOps Engineer', img: 'assets/photos/MARCHAND.Fabien.jpg'},
    { id: 'angevelle', pid: 'jean-marc.coic@intersec.com', stpid: 'bogops', name: 'Nicolas Angevelle', title: 'DevOps Engineer', img: 'assets/photos/ANGEVELLE.Nicolas.JPG'},
    { id: 'aline.fauquette@intersec.com', pid: 'jean-marc.coic@intersec.com', stpid: 'bogops', name: 'Aline Fauquette', title: 'DevOps Engineer', img: 'assets/photos/Fauquette.Aline.jpg'},

    /* Doc */
    { id: 'christele',  pid: 'kamal', stpid: 'transverse', name: 'Christele Camara', title: 'Technical Documentation Manager', img: 'assets/photos/Camara.Christele.jpg'},
    { id: 'oceane', pid: 'christele', stpid: 'doc', name: 'Oceane Boudinet', title: 'Technical Documentation Writer', img: 'assets/photos/Oceane_BOUDINET.jpg'},

    /* Archi independants */
    { id: 'jonathan.squirawski', pid: 'jean-marc.coic@intersec.com', stpid: 'rd-team', name: 'Jonathan Squirawski', title: 'Software Architect', img: 'assets/photos/Jonathan_Squirawski.jpg'},
    { id: 'sebastien', pid: 'jean-marc.coic@intersec.com', stpid: 'rd-team', name: 'Sebastien Thouement', title: 'Software Architect', img: 'assets/photos/THOUEMENT.Sebastien.JPG'},
    { id: 'mariat', pid: 'jean-marc.coic@intersec.com', stpid: 'rd-team', name: 'Benoit Mariat', title: 'Software Architect', img: 'assets/photos/Mariat.benoit.jpg'},

    /* Palladium */
    { id: 'alexis', pid: 'moha', stpid: 'engineering', name: 'Alexis Brasy', title: 'Team Leader', img: 'assets/photos/Brasy.Alexis.jpg'},
    { id: 'pauss', pid: 'alexis', stpid: 'palladium', name: 'Nicolas Pauss', title: 'Software Architect', img: 'assets/photos/PAUSS.nicolas.JPG'},
    { id: 'mathieuabou', pid: 'alexis', stpid: 'palladium', name: 'Mathieu Abou Haydar', title: 'Continuous Integrator', img: 'assets/photos/Mathieu_ABOU-HAYDAR.jpg'},
    { id: 'debroye', pid: 'alexis', stpid: 'palladium', name: 'Antoine Debroye', title: 'Continuous Integrator', img: 'assets/photos/DEBROYE.Antoine.jpg'},
    { id: 'stephane.richard@intersec.com', pid: 'alexis', stpid: 'palladium', name: 'Stephane Richard', title: 'C Developer', img: 'assets/photos/Stephane_RICHARD.jpg'},
    { id: 'muyao.chen', pid: 'alexis', stpid: 'palladium', name: 'Muyao Chen', title: 'C Developer', img: 'assets/photos/Muyao.Chen.jpg'},
    { id: 'fanyo.siliadin', pid: 'alexis', stpid: 'palladium', name: 'Fanyo Siliadin', title: 'Frontend Developer', img: 'assets/photos/Fanyo.Siliadin.jpg'},
    { id: 'dimitri.rivoire', pid: 'alexis', stpid: 'palladium', name: 'Dimitri Rivoire', title: 'Frontend Developer', img: 'assets/photos/Dimitri_RIVOIRE.jpg'},
    { id: 'frederic.chauveau', pid: 'alexis', stpid: 'palladium', name: 'Frederic Chauveau', title: 'C Developer', img: 'assets/photos/Frederic.Chauveau.png'},
    { id: 'mario', pid: 'alexis', name: 'Marion Larsen', stpid: 'palladium', title: 'Frontend Developer', img: 'assets/photos/Mario.Larsen.jpg'},
    { id: 'lemenager', pid: 'alexis', name: 'Damien Lemenager', stpid: 'palladium', title: 'Flutter Developer', img: 'assets/photos/Lemenager.Damien.jpg'},
    { id: 'yacine', pid: 'alexis', stpid: 'palladium', name: 'Yacine Boudiaf', title: 'Developer', img: 'assets/photos/Boudiaf.Yacine.jpg'},
    { id: 'imen', pid: 'alexis', stpid: 'palladium', name: 'Imen Benabdallah', title: 'Continuous Integrator', img: 'assets/photos/Imen_BENABDALLAH.jpg'},
    { id: 'djamel', pid: 'alexis', stpid: 'palladium', name: 'Djamel-Eddine Meharga', title: 'Developer', img: 'assets/photos/Meharga.Djamel.jpg'},

    /* Cobalt */
    { id: 'nassim.mnafeg', pid: 'moha', stpid: 'engineering', name: 'Nassim Mnafeg', title: 'Team Leader', img: 'assets/photos/Nassim_MNAFEG.jpg'},
    { id: 'romain', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Romain Le Godais', title: 'Software Architect', img: 'assets/photos/legodais.romain.jpg'},
    { id: 'guillaume', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Guillaume Chevallerau', title: 'Software Architect', img: 'assets/photos/chevallereau.guillaume.png'},
    { id: 'yannick', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Yannick Li', title: 'C Developer', img: 'assets/photos/Li.Yannick.jpg'},
    { id: 'maxime', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Maxime Leblanc', title: 'C Developer', img: 'assets/photos/Maxime_Leblanc.jpg'},
    { id: 'frederict', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Frederic Tutzo', title: 'Continuous Integrator', img: 'assets/photos/Frederic_Tutzo.jpg'},
    { id: 'segolene.tutzo', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Segolene Tutzo', title: 'Frontend Developer', img: 'assets/photos/Segolene_TUTZO.jpg'},
    { id: 'djaballah', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Djaballah Djedid', title: 'Developer', img: 'assets/photos/Djaballah_DJEDID.jpg'},
    { id: 'hassina', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Hassina Moulai', title: 'Developer', img: 'assets/photos/Hassina.Moulai.jpg'},
    { id: 'daosavanh', pid: 'nassim.mnafeg', stpid: 'cobalt', name: 'Daosavanh THEPSOUVANH', title: 'Continuous Integrator', img: 'assets/photos/Daosavanh.Thepsouvanh.jpg'},
    { id: 'amira', pid: 'nassim.mnafeg', stpid: 'telco', name: 'Amira Hadjer Bouali', title: 'Developer', img: 'assets/photos/Bouali.Amira.jpg'},
    { id: 'dihia', pid: 'nassim.mnafeg', stpid: 'telco', name: 'Dihia Salhi', title: 'Continuous Integrator', img: 'assets/photos/Dihia_SALHI.jpg'},

    /* Telco */
    { id: 'rawad', pid: 'moha', stpid: 'engineering', name: 'Rawad Zgheib', title: 'Team Leader', img: 'assets/photos/Rawad_Zgheib.png'},
    { id: 'kagan', pid: 'rawad', stpid: 'telco', name: 'Yann Kagan', title: 'Software Architect', img: 'assets/photos/Kagan.Yann.jpg'},
    { id: 'simone', pid: 'rawad', stpid: 'telco', name: 'Simone Moreno', title: 'Continuous Integrator', img: 'assets/photos/MORENO.Simone.jpg'},
    { id: 'biancale', pid: 'rawad', stpid: 'telco', name: 'Marion Biancale', title: 'Continuous Integrator', img: 'assets/photos/Biancale.Marion.jpg'},
    { id: 'manu', pid: 'rawad', stpid: 'telco', name: 'Emmanuel Cousin', title: 'C Developer', img: 'assets/photos/COUSIN.Emmanuel.JPG'},
    { id: 'xavier', pid: 'rawad', stpid: 'telco', name: 'Xavier Chantry', title: 'Software Architect', img: 'assets/photos/CHANTRY.xavier.JPG'},
    { id: 'caradec', pid: 'rawad', stpid: 'telco', name: 'Jeremy Caradec', title: 'C Developer', img: 'assets/photos/Caradec.Jeremy.png'},
    { id: 'loheac', pid: 'rawad', stpid: 'telco', name: 'Antoine Loheac', title: 'C Developer', img: 'assets/photos/loheac.antoine.png'},
    { id: 'matt', pid: 'rawad', stpid: 'telco', name: 'Mathieu Vallet', title: 'C Developer', img: 'assets/photos/Vallet.Mathieu.jpg'},
    { id: 'safwan', pid: 'rawad', stpid: 'telco', name: 'Safwan Alwan', title: 'C Developer', img: 'assets/photos/Alwane.Safwan.jpg'},
    { id: 'yossef', pid: 'rawad', stpid: 'telco', name: 'Yossef Rostaqi', title: 'C Developer', img: 'assets/photos/Rostaqi.Yossef.jpg'},
    { id: 'elie.duleu@intersec.com', pid: 'rawad', stpid: 'telco', name: 'Elie Duleu', title: 'C Developer', img: 'assets/photos/Elie.Duleu.jpg'},
    { id: 'guillaume.renaud', pid: 'rawad', stpid: 'telco', name: 'Guillaume Renaud', title: 'Continuous Integrator', img: 'assets/photos/Guillaume.Renaud.jpg'},




    /* }}} */
    /* {{{ Sales */

    { id: 'ingolf.ruh@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'intersec', tags: ['management'], name: 'Ingolf Ruh', title: 'CRO', img: 'assets/photos/RUH.Ingolf.jpg'},

    { id: 'arnaud.westphal@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-team', name: 'Arnaud Westphal', title: 'VP Sales', tags: ['management'], img: 'assets/photos/WESTPHAL.Arnaud.JPG' },
    { id: 'nicolas.haddad@intersec.com', pid: 'arnaud.westphal@intersec.com', stpid: 'sales-eu', name: 'Nicolas Haddad', title: 'Regional Sales Manager', img: 'assets/photos/haddad.Nicolas.jpg' },
    { id: 'thomas.marquis@intersec.com', pid: 'arnaud.westphal@intersec.com', stpid: 'sales-eu', name: 'Thomas Marquis', title: 'Regional Sales Manager', img: 'assets/photos/Marquis.Thomas.jpg' },
    { id: 'nicolas.delaunay@intersec.com', pid: 'arnaud.westphal@intersec.com', stpid: 'sales-eu', name: 'Nicolas Delaunay', title: 'Regional Sales Manager', img: 'assets/photos/Delaunay.Nicolas.jpg' },
    { id: 'souad.touil@intersec.com', pid: 'arnaud.westphal@intersec.com', stpid: 'sales-eu', name: 'Souad Touil', title: 'Regional Sales Director', img: 'assets/photos/TOUIL.Souad.JPG' },

    { id: 'ali.houssni@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eu', name: 'Ali Houssni', title: 'Presales', img: 'assets/photos/Houssni.Ali.jpg' },
    { id: 'cedrick.vero@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eu', name: 'Cedrick Vero', title: 'Presales', img: 'assets/photos/Vero.Cedrick.png' },
    { id: 'chloe', stpid: 'presales-eu', pid: 'ingolf.ruh@intersec.com', name: 'Chloe MAROUN', title: 'Presales', img: 'assets/photos/Chloe_MAROUN.jpg' },
    { id: 'ahmed.lyahou@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eu', name: 'Ahmed LYAHOU', title: 'Presales', img: 'assets/photos/Ahmed_LYAHOU.jpg' },

    /* Trela */
    { id: 'alexandre.quince@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid:'sdr', name: 'Alexandre Quince', title: 'Sales Development Representative', img: 'assets/photos/Alexandre.QUINCE.jpg'},

    /* EEME */
    { id: 'ahmed.hamza@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-team', name: 'Ahmed Hamza', title: 'VP Sales', tags: ['management'], img: 'assets/photos/HAMZA.Ahmed.jpg' },
    { id: 'fehmi.sanaa', pid: 'ahmed.hamza@intersec.com', stpid: 'sales-eeme', name: 'Fehmi SANAA', title: 'Regional Sales Manager - Dubai', img: 'assets/photos/Fehmi_SANAA.jpg' },
    { id: 'abdurrahim.suslu', pid: 'ahmed.hamza@intersec.com', stpid: 'sales-eeme', name: 'Abdurrahim SUSLU', title: 'Regional Sales Manager - Dubai', img: 'assets/photos/Abdurrahim_SUSLU.jpg' },

    { id: 'tarek.tarawneh@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eeme', name: 'Tarek Al Tarawneh', title: 'Presales', img: 'assets/photos/Tarawneh.Tarek.png' },
    { id: 'mohammed.abbas@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eeme', name: 'Mohammed Abbas', title: 'Presales', img: 'assets/photos/Mohamed.Abas.jpg' },

    /* Americas */
    { id: 'tom.mcewan@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-americas', name: 'Tom McEwan', title: 'Regional Sales Manager', img: 'assets/photos/mcewan.Tom.JPG' },
    { id: 'stephane.jutras', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-americas', name: 'Stephane Jutras', title: 'Presales', img: 'assets/photos/Stephane_JUTRAS.jpg' },

    /* APAC */
    { id: 'kurian.manjakkal@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-apac', name: 'Kurian Manjakkal', title: 'VP Sales', tags: ['management'], img: 'assets/photos/Manjakkal.Kurian.jpg'},
    { id: 'yonghaw.goh', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-apac', name: 'Yonghaw GOH', title: 'Pre Sales', img: 'assets/photos/Yonghaw_GOH.jpg'},


    /* }}} */
    /* {{{ PS */


    /* Management */
    { id: 'mohit.maheshwari@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'intersec', tags: ['management'], name: 'Mohit Maheshwari', title: 'VP Operations', img: 'assets/photos/Maheshwari.Mohit.jpg'},

    /* SA */
    { id: 'nicolas.najman@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-team', tags: ['management'], name: 'Nicolas Najman', title: 'SA Director', img: 'assets/photos/najman.nicolas.png' },
    { id: 'abdelmoula.elousfour@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'Abdelmoula El Ousfour', title: 'Solution Architect', img: 'assets/photos/Abdelmoula.Elousfour.jpg' },
    { id: 'imad.zinade@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'Imad Zidane', title: 'Solution Architect', img: 'assets/photos/Imad_ZIDANE.jpg' },
    { id: 'aneep.srivastava@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'Aneep Srivastava', title: 'Solution Architect', img: 'assets/photos/Srivastava.Aneep.png' },
    { id: 'braulio.castillo@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'Braulio Castillo', title: 'Solution Architect', img: 'assets/photos/Castillo.Braulio.jpg' },
    { id: 'david.fontmartin@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'David Fontmartin', title: 'Solution Architect', img: 'assets/photos/FONTMARTIN.David.jpg' },
    { id: 'adel.amri@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'Adel Amri', title: 'Solution Architect', img: 'assets/photos/Adel.Amri.jpg' },
    { id: 'mohamed.yousuf@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'Mohamed Yousuf Sulaiman', title: 'Solution Architect', img: 'assets/photos/Mohamed.Yousuf.jpg' },
    { id: 'w.kaddour-ext@intersec.com', pid: 'nicolas.najman@intersec.com', stpid: 'sa-team', name: 'Walid Kaddour', title: 'Solution Architect (TN)', img: 'assets/photos/Walid_Kaddour.jpg'},

    /* TQ */
    { id: 'simon.ravier@intersec.com', pid:'emilien.coffin@intersec.com', stpid: 'ps-team', name: 'Simon Ravier', title: 'Integration Technical Lead', img: 'assets/photos/Ravier.Simon.png' },
    { id: 'jonas.prieur@intersec.com', pid: 'simon.ravier@intersec.com', stpid: 'ps-tq', name: 'Jonas Prieur', title: 'Integration Engineer', img: 'assets/photos/Jonas.PRIEUR.jpg' },
    { id: 'alexandre.riquier@intersec.com', pid: 'simon.ravier@intersec.com', stpid: 'ps-tq', name: 'Alexandre Riquier', title: 'Integration Engineer', img: 'assets/photos/Alexandre_Riquier.jpg' },

    /* Europe */
    { id: 'emilien.coffin@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-team', name: 'Emilien Coffin', title: 'Leader of Integration Process', tags: ['management'], img: 'assets/photos/COFFIN.Emilien.JPG' },
    { id: 'djamila.bendjafar@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Djamila Bendjafar', title: 'Project Manager', img: 'assets/photos/Benjafar.Djamila.jpg' },
    { id: 'maja.lazarevska@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Maja Lazarevska', title: 'Project Manager', img: 'assets/photos/Lazarevska.Maja.jpg' },
    { id: 'jean.huber@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Jean Huber', title: 'Project Manager', img: 'assets/photos/Jean.Huber.png' },
    { id: 'nadia.traore@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Nadia Traore', title: 'Project Manager', img: 'assets/photos/Nadia.Traore.jpg' },
    { id: 'alexandre.prengere@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Alexandre Prengere', title: 'Project Manager', img: 'assets/photos/Alexandre.Prengere.jpg' },
    { id: 'xavier.afyouni@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Xavier Afyouni', title: 'IT Trainer', img: 'assets/photos/Xavier_AFYOUNI.jpg'},
    { id: 'elie.elhamawi@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Elie El Hamawi', title: 'Integration Engineer', img: 'assets/photos/Elie.ElHamawi.jpg' },
    { id: 'sirine.ibrahim@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Sirine Ibrahim', title: 'Integration Engineer', img: 'assets/photos/Ibrahim.Sirine.png' },
    { id: 'reshmi.anand@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Reshmi Anand', title: 'Integration Engineer', img: 'assets/photos/Reshmi.Anand.jpg' },
    { id: 'chiheb.bestaoui@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Chiheb Bestaoui', title: 'Integration Engineer', img: 'assets/photos/chiheb_bestaoui.jpg'},
    { id: 'jerome.levol@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Jerome Levol', title: 'Integration Engineer', img: 'assets/photos/Jerome.Levol.jpg'},
    { id: 'filip.biljic@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Filip Biljic', title: 'Integration Engineer', img: 'assets/photos/Filip.Biljic.jpg'},
    { id: 'l.chalouati-ext@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Latifa Chalouati', title: 'Integration Engineer', img: 'assets/photos/Latifa_Chalouati.jpg'},
    { id: 'd.belghoul-ext@intersec.com', pid: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Djamel-Eddine Belghoul', title: 'Integration Engineer', img: 'assets/photos/Djamel.Eddine.Belghoul.jpg'},

    /* Middle East */
    { id: 'haytham.beshir@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-team', tags: ['management'], name: 'Haytham Beshir', title: 'Program Manager', img: 'assets/photos/beshir.haytham.jpg' },
    { id: 'mohamad.dib@intersec.com', pid: 'haytham.beshir@intersec.com', stpid: 'ps-eeme-program', name: 'Mohamad Dib', title: 'Integration Engineer', img: 'assets/photos/dib.mohamad.png' },
    { id: 'preeti', pid: 'haytham.beshir@intersec.com', stpid: 'ps-eeme-program', name: 'Preeti AGGARWAL', title: 'Managed Service Expert - DUBAI', img: 'assets/photos/Preeti_AGGARWAL.jpg' },
    { id: 'anand.panwar', pid: 'haytham.beshir@intersec.com', stpid: 'ps-eeme-program', name: 'Anand PANWAR', title: 'Integration Engineer', img: 'assets/photos/Anand.Panwar.jpg' },


    { id: 'neeraj', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-team', tags: ['management'], name: 'Neeraj BHATNAGAR', title: 'Project Manager', img: 'assets/photos/Neeraj_BHATNAGAR.jpg' },
    { id: 'naveen', pid: 'neeraj', stpid: 'ps-eeme-project', name: 'Naveen KUMAR', title: 'Solution Architect - DUBAI', img: 'assets/photos/Naveen_KUMAR.jpg' },
    { id: 'mohamed.aboelnoor@intersec.com', pid: 'neeraj', stpid: 'ps-eeme-project', name: 'Mohamed Aboelnoor', title: 'Integration Engineer (Egypt)', img: 'assets/photos/Aboelnoo.Mohamed.png' },
    { id: 'anas.mohamed@intersec.com', pid: 'neeraj', stpid: 'ps-eeme-project', name: 'Anas Mohamed', title: 'Integration Engineer (Egypt)', img: 'assets/photos/Anas_Mohamed.jpg' },

    /* Americas */
    { id: 'matthias.granger@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-team', tags: ['management'], name: 'Matthias Granger', title: 'Project Manager & Regional TL', img: 'assets/photos/granger.matthias.jpg' },
    { id: 'curtis.jameson@intersec.com', pid: 'matthias.granger@intersec.com', stpid: 'ps-americas', name: 'Curtis Jameson', title: 'Integration Engineer', img: 'assets/photos/Jameson.Curtis.png' },
    { id: 'sneha.dhotre', pid: 'matthias.granger@intersec.com', stpid: 'ps-americas', name: 'Sneha DHOTRE', title: 'Integration Engineer', img: 'assets/photos/Sneha_DHOTRE.png'},
    { id: 'gabriel.terrien@intersec.com', pid: 'matthias.granger@intersec.com', stpid: 'ps-americas', name: 'Gabriel Terrien', title: 'Integration Engineer', img: 'assets/photos/terrien.gabriel.jpg' },

    /* Tiger */
    { id: 'skander.souidane@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-tiger', name: 'Skander Souidane', title: 'Tiger Program Manager', img: 'assets/photos/SOUIDANE.Skander.jpg' },
    { id: 'yassin.sekri@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-tiger', name: 'Yassin Sekri', title: 'Integration Engineer', img: '' },
    { id: 'nahin.musarrat@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-tiger', name: 'Nahin Musarrat', title: 'Integration Engineer', img: 'assets/photos/Nahin.Musarrat.png' },

    /* Support */
    { id: 'onur.topcu@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-team', name: 'Onur Topcu', title: 'Support Manager', tags: ['management'], img: 'assets/photos/Topcu.Onur.png' },
    { id: 'djibril.faty@intersec.com', pid: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Djibril Faty', title: 'Support Engineer', img: 'assets/photos/FATY.Djibril.jpg' },
    { id: 'nicolas.legrand@intersec.com', pid: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Nicolas Legrand', title: 'Support Engineer', img: 'assets/photos/LEGRAND.Nicolas.JPG' },
    { id: 'nawaal.mamadou@intersec.com', pid: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Nawaal Mamadou', title: 'Support Engineer', img: 'assets/photos/MAMADOU.Nawaal.jpg' },
    { id: 'victorien.serre@intersec.com', pid: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Victorien Serre', title: 'Support Engineer', img: '' },
    { id: 'ahmed.benmajdouba@intersec.com', pid: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Ahmed BEN MAJDOUBA', title: 'Support Engineer', img: 'assets/photos/Ahmed_BENMAJDOUBA.jpg'},
    { id: 'nikola.milic@intersec.com', pid: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Nikola Milić', title: 'Support Engineer', img: ''},
    { id: 'shabab.vadakkangara@intersec.com', pid: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Shabab Vadakkangara', title: 'Support Engineer (Dubai)', img: 'assets/photos/Shabab.Vadakkangara.jpg' },

    /* External integrators */
    { id: 'm.azaiez-ext@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'tunis-team', name: 'Meryam Azaiez', title: 'Integration Engineer (TN)', img: 'assets/photos/Meryam_Azaiez.jpg'},
    { id: 'm.bensaid-ext@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'tunis-team', name: 'Mahdi Ben Said', title: 'Integration Engineer (TN)', img: ''},

    /* }}} */
    /* IT & CloudOps*/

    { id: 'clement', pid: 'jean-marc.coic@intersec.com', stpid: 'rd-team', name: 'Clement Vandoolaeghe', title: 'Head of Platform Operations', img: 'assets/photos/Clement.Vandoolaeghe.jpg'},

    { id: 'kevin.champion@intersec.com', pid: 'clement', stpid: 'it-team', name: 'Kevin Champion', title: 'IT Manager', img: 'assets/photos/Kevin_Champion.jpg'},
    { id: 'nicolas.sery@intersec.com', pid: 'clement', stpid: 'it-team', name: 'Nicolas Sery', title: 'System administrator', img: 'assets/photos/Nicolas.Sery.jpg'},
    { id: 'matthieu.michelet', pid: 'clement', stpid: 'it-team', name: 'Matthieu Michelet', title: 'Site Reliability Engineer', img: 'assets/photos/matthieu_michelet.jpg'},
    { id: 'bree', stpid: 'it-team', pid: 'clement', name: 'Simon Bree', title: 'Site Reliability Engineer', img: 'assets/photos/Bree.simon.jpg'},

    /* }}} */
    /* {{{ HR */

    { id: 'oyo.ndoro@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'intersec', tags: ['management'], name: 'Oyo NDoro', title: 'VP Talent', img: 'assets/photos/NDORO.Oyo.jpg'},
    { id: 'rkia.hatif@intersec.com', pid: 'oyo.ndoro@intersec.com', stpid: 'hr-team', name: 'Rkia Hatif', title: 'Payroll and Administrative Manager', img: 'assets/photos/hatif.rkia.png' },
    { id: 'sarra.benslimen@intersec.com', pid: 'rkia.hatif@intersec.com', stpid: 'hr-administration', name: 'Sarra Ben Slimen', title: 'HR Assistant', img: 'assets/photos/Sara.Ben.Slimane.jpg' },
    { id: 'kamel.majdoub@intersec.com', pid: 'oyo.ndoro@intersec.com', stpid: 'hr-team', name: 'Kamel Majdoub', title: 'Recruitment Manager', img: 'assets/photos/majdoub.kamel.png' },
    { id: 'samy.kammoun@intersec.com', pid: 'kamel.majdoub@intersec.com', stpid: 'hr-recrutement', name: 'Samy KAMMOUN', title: 'Recruitment Assistant', img: 'assets/photos/Samy.Kammoun.jpg' },
    { id: 'anne-laurence.zanclan@intersec.com', pid: 'oyo.ndoro@intersec.com', stpid: 'hr-team', name: 'Anne-Laurence Zanclan', title: 'Hiring Consultant', img: 'assets/photos/ZANCLAN.Anne-Laurence.jpg' },

    /* }}} */
    /* {{{ Accounting */

    { id: 'nicolas.rousseau-dumarcet@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'intersec', tags: ['management'], name: 'Nicolas Rousseau Dumarcet', title: 'CFO', img: 'assets/photos/Nicolas.Rousseau-Dumarcet.jpg'},
    { id: 'caroline.dumaitre@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', stpid: 'accounting', name: 'Caroline Dumaitre', title: 'Accounting and Financial Manager', img: 'assets/photos/Dumaitre.Caroline.png' },
    { id: 'isabelle.granger@intersec.com', pid: 'caroline.dumaitre@intersec.com', stpid: 'finance', name: 'Isabelle Granger', title: 'General Accountant', img: 'assets/photos/Granger.Isabelle.jpeg' },
    { id: 'sanh.nguyen@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', stpid: 'accounting', name: 'Sanh Nguyen', title: 'Senior FP&A Analyst', img: 'assets/photos/Sanh_NGUYEN.jpg' },
    { id: 'mouna.benzaroual@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', stpid: 'accounting', name: 'Mouna Benzaroual', title: 'Sales Administration Manager', img: 'assets/photos/Mouna.Benzaroual.jpg' },

    /* }}} */
];

// Call the function with your array
createWorkersFolder(workers);