const fs = require('fs');
const path = require('path');

function createTeamFolders(dataArray) {
  // Create "team" folder
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

    // Create text file inside the member folder
    const ficheFilePath = path.join(memberFolderPath, 'fiche.txt');
    const fileContent = `firstname: ${member.name.split(' ')[0]}\n` +
                        `lastname: ${member.name.split(' ').pop()}\n` +
                        `position: ${member.title}\n` +
                        `n+1: ${member.pid.split('@')[0].split('.').map((s) => `${s.charAt(0).toUpperCase() + s.slice(1)}`).join(' ')}\n` +
                        `img: ${member.img}\n` +
                        `tags: ${(member.tags && member.tags.join(' ')) ?? ''}`;


    fs.writeFileSync(ficheFilePath, fileContent);
  });

  console.log('Team folders and files created successfully!');
}

// Example array
const teamArray = [

    /* }}} */
    /* {{{ CEO */

    { id: 'yann.chevalier@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'top-management', tags: ['management'], name: 'Yann Chevalier', title: 'CEO', img: 'assets/photos/CHEVALIER.Yann.jpg' },

    /* }}} */
    /* {{{ Marketing */

    { id: 'cardona', pid: 'yann.chevalier@intersec.com', stpid: 'mkt-team', tags: ['management'], name: 'Charlotte Cardona', title: 'Marketing & Communication Director', img: 'assets/photos/Cardona.Charlotte.png'},
    { id: 'thomas.grahamwood', pid: 'cardona', name: 'Thomas Graham-Wood', title: 'Marketing and Communication Specialist', img: 'assets/photos/Thomas_GRAHAM-WOOD.jpg'},
    { id: 'marie-luna', pid: 'cardona', name: 'Marie-Luna Gonzalez', title: 'Marketing and Social Networking Apprentice', img: 'assets/photos/Marie.Luna.Gonzalez.jpg'},

    /* }}} */
    /* {{{ PDM */

    { id: 'christophe.nez@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'pdm-team', tags: ['management'], name: 'Christophe Nez', title: 'VP Product Marketing', img: 'assets/photos/NEZ.christophe.png'},
    { id: 'charlotte.thomas', pid: 'christophe.nez@intersec.com', name: 'Charlotte Thomas', title: 'Cloud Offering Director', img: 'assets/photos/Charlotte_THOMAS.jpg'},
    { id: 'sebastien.synold', pid: 'christophe.nez@intersec.com', name: 'Sébastien Synold', title: 'Product Manager', img: 'assets/photos/Sebastien_SYNOLD.jpg'},

    /* }}} */
    /* {{{ R&D */

    /* Head */
    { id: 'ana', pid: 'yann.chevalier@intersec.com', stpid: 'rd-team', tags: ['management'], name: 'Jean-Marc Coïc', title: 'CTO', img: 'assets/photos/COIC.Jean-Marc.jpg'},
    { id: 'kamal', pid: 'ana', tags: ['management'], name: 'Kamal Fadlaoui', title: 'VP Engineering', img: 'assets/photos/Fadlaoui.Kamal.jpg'},
    { id: 'moha', pid: 'ana', tags: ['management'], name: 'Mohamed Kahlal', title: 'VP Engineering Delivery', img: 'assets/photos/KAHLAL.mohamed.png'},


    /* PO */
    { id: 'mas', pid: 'ana', stpid: 'po', name: 'Vincent Mas', title: 'Product Owner', img: 'assets/photos/Mas.Vincent.png'},
    { id: 'yohann', pid: 'ana', stpid: 'po', name: 'Yohann Balawender', title: 'Product Owner', img: 'assets/photos/Balawander.Yohann.jpg'},
    { id: 'marwane', pid: 'ana', stpid: 'po', name: 'Marwane Akram', title: 'Product Owner', img: 'assets/photos/AKRAM.Marwane.jpg'},
    { id: 'amer', pid: 'ana', stpid: 'po', name: 'Amer Bdeoui', title: 'Product Owner', img: 'assets/photos/Bdoui.Amer.png'},
    { id: 'alex.slavutskyi@intersec.com', pid: 'ana', stpid: 'po', name: 'Alex Slavutskyi', title: 'UX/UI Designer', img: 'assets/photos/Alex.Slavutskyi.jpg'},

    /* Data Science */
    { id: 'cuny', pid: 'ana', stpid: 'data-science', name: 'Pierre-Louis Cuny', title: 'Data Science Team Lead', img: 'assets/photos/CUNY.Pierre-Louis.jpg'},
    { id: 'gosset', pid: 'cuny', name: 'Christophe Gosset', title: 'Data Scientist', img: 'assets/photos/Gosset.Christophe.jpg'},
    { id: 'killian', pid: 'cuny', name: 'Killian Le Goff', title: 'Data Scientist', img: 'assets/photos/Killian_LeGoff.jpg'},

    /* BogOps */
    { id: 'marchand', pid: 'ana', stpid: 'bogops', name: 'Fabien Marchand', title: 'DevOps Engineer', img: 'assets/photos/MARCHAND.Fabien.jpg'},
    { id: 'angevelle', pid: 'ana', stpid: 'bogops', name: 'Nicolas Angevelle', title: 'DevOps Engineer', img: 'assets/photos/ANGEVELLE.Nicolas.JPG'},
    { id: 'aline.fauquette@intersec.com', pid: 'ana', stpid: 'bogops', name: 'Aline Fauquette', title: 'DevOps Engineer', img: 'assets/photos/Fauquette.Aline.jpg'},

    /* Transverse */
    { id: 'jonathan.squirawski', pid: 'ana', stpid: 'transverse', name: 'Jonathan Squirawski', title: 'Software Architect', img: 'assets/photos/Jonathan_Squirawski.jpg'},
    { id: 'sebastien', pid: 'ana', stpid: 'transverse', name: 'Sebastien Thouément', title: 'Software Architect', img: 'assets/photos/THOUEMENT.Sebastien.JPG'},
    { id: 'mariat', pid: 'ana', stpid: 'transverse', name: 'Benoit Mariat', title: 'Software Architect', img: 'assets/photos/Mariat.benoit.jpg'},
    { id: 'christele',  pid: 'kamal', stpid: 'transverse', name: 'Christèle Camara', title: 'Technical Documentation Manager', img: 'assets/photos/Camara.Christele.jpg'},
    { id: 'oceane', pid: 'christele', name: 'Océane Boudinet', title: 'Technical Documentation Writer', img: 'assets/photos/Oceane_BOUDINET.jpg'},

    /* Palladium */
    { id: 'alexis', pid: 'moha', stpid: 'palladium', name: 'Alexis Brasy', title: 'Team Leader', img: 'assets/photos/Brasy.Alexis.jpg'},
    { id: 'pauss', pid: 'alexis', name: 'Nicolas Pauss', title: 'Software Architect', img: 'assets/photos/PAUSS.nicolas.JPG'},
    { id: 'mathieuabou', pid: 'alexis', name: 'Mathieu Abou Haydar', title: 'Continuous Integrator', img: 'assets/photos/Mathieu_ABOU-HAYDAR.jpg'},
    { id: 'debroye', pid: 'alexis', name: 'Antoine Debroye', title: 'Continuous Integrator', img: 'assets/photos/DEBROYE.Antoine.jpg'},
    { id: 'stephane.richard@intersec.com', pid: 'alexis', name: 'Stéphane Richard', title: 'C Developer', img: 'assets/photos/Stephane_RICHARD.jpg'},
    { id: 'muyao.chen', pid: 'alexis', name: 'Muyao Chen', title: 'C Developer', img: 'assets/photos/Muyao.Chen.jpg'},
    { id: 'fanyo.siliadin', pid: 'alexis', name: 'Fanyo Siliadin', title: 'Frontend Developer', img: 'assets/photos/Fanyo.Siliadin.jpg'},
    { id: 'dimitri.rivoire', pid: 'alexis', name: 'Dimitri Rivoire', title: 'Frontend Developer', img: 'assets/photos/Dimitri_RIVOIRE.jpg'},
    { id: 'frederic.chauveau', pid: 'alexis', name: 'Frederic Chauveau', title: 'C Developer', img: 'assets/photos/Frederic.Chauveau.png'},
    { id: 'mario', pid: 'alexis', name: 'Marion Larsen', title: 'Frontend Developer', img: 'assets/photos/Mario.Larsen.jpg'},
    { id: 'lemenager', pid: 'alexis', name: 'Damien Lemenager', title: 'Flutter Developer', img: 'assets/photos/Lemenager.Damien.jpg'},

    /* Cobalt */
    { id: 'nassim.mnafeg', pid: 'moha', stpid: 'cobalt', name: 'Nassim Mnafeg', title: 'Team Leader', img: 'assets/photos/Nassim_MNAFEG.jpg'},
    { id: 'romain', pid: 'nassim.mnafeg', name: 'Romain Le Godais', title: 'Software Architect', img: 'assets/photos/legodais.romain.jpg'},
    { id: 'guillaume', pid: 'nassim.mnafeg', name: 'Guillaume Chevallerau', title: 'Software Architect', img: 'assets/photos/chevallereau.guillaume.png'},
    { id: 'yannick', pid: 'nassim.mnafeg', name: 'Yannick Li', title: 'C Developer', img: 'assets/photos/Li.Yannick.jpg'},
    { id: 'maxime', pid: 'nassim.mnafeg', name: 'Maxime Leblanc', title: 'C Developer', img: 'assets/photos/Maxime_Leblanc.jpg'},
    { id: 'frederict', pid: 'nassim.mnafeg', name: 'Frédéric Tutzo', title: 'Continuous Integrator', img: 'assets/photos/Frederic_Tutzo.jpg'},
    { id: 'segolene.tutzo', pid: 'nassim.mnafeg', name: 'Ségolène Tutzo', title: 'Frontend Developer', img: 'assets/photos/Segolene_TUTZO.jpg'},
    { id: 'djaballah', pid: 'nassim.mnafeg', name: 'Djaballah Djedid', title: 'Developer', img: 'assets/photos/Djaballah_DJEDID.jpg'},
    { id: 'hassina', pid: 'nassim.mnafeg', name: 'Hassina Moulaï', title: 'Developer', img: 'assets/photos/Hassina.Moulai.jpg'},
    { id: 'daosavanh', pid: 'nassim.mnafeg', name: 'Daosavanh THEPSOUVANH', title: 'Continuous Integrator', img: 'assets/photos/Daosavanh.Thepsouvanh.jpg'},

    /* Telco */
    { id: 'rawad', pid: 'moha', stpid: 'telco', name: 'Rawad Zgheib', title: 'Team Leader', img: 'assets/photos/Rawad_Zgheib.png'},
    { id: 'kagan', pid: 'rawad', name: 'Yann Kagan', title: 'Software Architect', img: 'assets/photos/Kagan.Yann.jpg'},
    { id: 'simone', pid: 'rawad', name: 'Simone Moreno', title: 'Continuous Integrator', img: 'assets/photos/MORENO.Simone.jpg'},
    { id: 'biancale', pid: 'rawad', name: 'Marion Biancale', title: 'Continuous Integrator', img: 'assets/photos/Biancale.Marion.jpg'},
    { id: 'manu', pid: 'rawad', name: 'Emmanuel Cousin', title: 'C Developer', img: 'assets/photos/COUSIN.Emmanuel.JPG'},
    { id: 'xavier', pid: 'rawad', name: 'Xavier Chantry', title: 'Software Architect', img: 'assets/photos/CHANTRY.xavier.JPG'},
    { id: 'caradec', pid: 'rawad', name: 'Jeremy Caradec', title: 'C Developer', img: 'assets/photos/Caradec.Jeremy.png'},
    { id: 'loheac', pid: 'rawad', name: 'Antoine Loheac', title: 'C Developer', img: 'assets/photos/loheac.antoine.png'},
    { id: 'matt', pid: 'rawad', name: 'Mathieu Vallet', title: 'C Developer', img: 'assets/photos/Vallet.Mathieu.jpg'},
    { id: 'safwan', pid: 'rawad', name: 'Safwan Alwan', title: 'C Developer', img: 'assets/photos/Alwane.Safwan.jpg'},
    { id: 'yossef', pid: 'rawad', name: 'Yossef Rostaqi', title: 'C Developer', img: 'assets/photos/Rostaqi.Yossef.jpg'},
    { id: 'elie.duleu@intersec.com', pid: 'rawad', name: 'Elie Duleu', title: 'C Developer', img: 'assets/photos/Elie.Duleu.jpg'},
    { id: 'guillaume.renaud', pid: 'rawad', name: 'Guillaume Renaud', title: 'Continuous Integrator', img: 'assets/photos/Guillaume.Renaud.jpg'},

    /* Palladium contractors */
    { id: 'yacine', pid: 'alexis',  stpid: 'innovia1', name: 'Yacine Boudiaf', title: 'Developer', img: 'assets/photos/Boudiaf.Yacine.jpg'},

    /* Cobalt contractors */
    { id: 'imen', pid: 'alexis', stpid: 'innovia2', name: 'Imen Benabdallah', title: 'Continuous Integrator', img: 'assets/photos/Imen_BENABDALLAH.jpg'},
    { id: 'amira', pid: 'alexis', stpid: 'innovia2', name: 'Amira Hadjer Bouali', title: 'Developer', img: 'assets/photos/Bouali.Amira.jpg'},
    { id: 'djamel', pid: 'alexis', stpid: 'innovia2', name: 'Djamel-Eddine Meharga', title: 'Developer', img: 'assets/photos/Meharga.Djamel.jpg'},
    { id: 'dihia', pid: 'nassim.mnafeg', stpid: 'innovia2', name: 'Dihia Salhi', title: 'Continuous Integrator', img: 'assets/photos/Dihia_SALHI.jpg'},


    /* }}} */
    /* {{{ Sales */

    { id: 'ingolf.ruh@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'sales-team', tags: ['management'], name: 'Ingolf Ruh', title: 'CRO', img: 'assets/photos/RUH.Ingolf.jpg'},

    /* WEA */
    { id: 'arnaud.westphal@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-eu', name: 'Arnaud Westphal', title: 'VP Sales', tags: ['management'], img: 'assets/photos/WESTPHAL.Arnaud.JPG' },
    { id: 'ali.houssni@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eu', name: 'Ali Houssni', title: 'Presales', img: 'assets/photos/Houssni.Ali.jpg' },
    { id: 'cedrick.vero@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eu', name: 'Cédrick Vero', title: 'Presales', img: 'assets/photos/Vero.Cedrick.png' },
    { id: 'chloe', stpid: 'presales-eu', pid: 'ingolf.ruh@intersec.com', name: 'Chloé MAROUN', title: 'Presales', img: 'assets/photos/Chloe_MAROUN.jpg' },
    { id: 'ahmed.lyahou@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eu', name: 'Ahmed LYAHOU', title: 'Presales', img: 'assets/photos/Ahmed_LYAHOU.jpg' },
    { id: 'nicolas.haddad@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Nicolas Haddad', title: 'Regional Sales Manager', img: 'assets/photos/haddad.Nicolas.jpg' },
    { id: 'thomas.marquis@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Thomas Marquis', title: 'Regional Sales Manager', img: 'assets/photos/Marquis.Thomas.jpg' },
    { id: 'nicolas.delaunay@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Nicolas Delaunay', title: 'Regional Sales Manager', img: 'assets/photos/Delaunay.Nicolas.jpg' },
    { id: 'souad.touil@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Souad Touil', title: 'Regional Sales Director', img: 'assets/photos/TOUIL.Souad.JPG' },

    /* Trela */
    { id: 'alexandre.quince@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid:'sdr', name: 'Alexandre Quincé', title: 'Sales Development Representative', img: 'assets/photos/Alexandre.QUINCE.jpg'},

    /* EEME */
    { id: 'ahmed.hamza@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-eeme', name: 'Ahmed Hamza', title: 'VP Sales', tags: ['management'], img: 'assets/photos/HAMZA.Ahmed.jpg' },
    { id: 'fehmi.sanaa', pid: 'ahmed.hamza@intersec.com', name: 'Fehmi SANAA', title: 'Regional Sales Manager - Dubai', img: 'assets/photos/Fehmi_SANAA.jpg' },
    { id: 'abdurrahim.suslu', pid: 'ahmed.hamza@intersec.com', name: 'Abdurrahim SUSLU', title: 'Regional Sales Manager - Dubai', img: 'assets/photos/Abdurrahim_SUSLU.jpg' },

    { id: 'tarek.tarawneh@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eeme', name: 'Tarek Al Tarawneh', title: 'Presales', img: 'assets/photos/Tarawneh.Tarek.png' },
    { id: 'mohammed.abbas@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-eeme', name: 'Mohammed Abbas', title: 'Presales', img: 'assets/photos/Mohamed.Abas.jpg' },

    /* Americas */
    { id: 'tom.mcewan@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-americas', name: 'Tom McEwan', title: 'Regional Sales Manager', img: 'assets/photos/mcewan.Tom.JPG' },
    { id: 'stephane.jutras', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-americas', name: 'Stéphane Jutras', title: 'Presales', img: 'assets/photos/Stephane_JUTRAS.jpg' },

    /* APAC */
    { id: 'kurian.manjakkal@intersec.com', pid: 'ingolf.ruh@intersec.com', stpid: 'sales-apac', name: 'Kurian Manjakkal', title: 'VP Sales', tags: ['management'], img: 'assets/photos/Manjakkal.Kurian.jpg'},
    { id: 'yonghaw.goh', pid: 'ingolf.ruh@intersec.com', stpid: 'presales-apac', name: 'Yonghaw GOH', title: 'Pre Sales', img: 'assets/photos/Yonghaw_GOH.jpg'},


    /* }}} */
    /* {{{ PS */


    /* Management */
    { id: 'mohit.maheshwari@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'ps-team', tags: ['management'], name: 'Mohit Maheshwari', title: 'VP Operations', img: 'assets/photos/Maheshwari.Mohit.jpg'},

    /* SA */
    { id: 'nicolas.najman@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'sa-team', tags: ['management'], name: 'Nicolas Najman', title: 'SA Director', img: 'assets/photos/najman.nicolas.png' },
    { id: 'abdelmoula.elousfour@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Abdelmoula El Ousfour', title: 'Solution Architect', img: 'assets/photos/Abdelmoula.Elousfour.jpg' },
    { id: 'imad.zinade@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Imad Zidane', title: 'Solution Architect', img: 'assets/photos/Imad_ZIDANE.jpg' },
    { id: 'aneep.srivastava@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Aneep Srivastava', title: 'Solution Architect', img: 'assets/photos/Srivastava.Aneep.png' },
    { id: 'braulio.castillo@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Braulio Castillo', title: 'Solution Architect', img: 'assets/photos/Castillo.Braulio.jpg' },
    { id: 'david.fontmartin@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'David Fontmartin', title: 'Solution Architect', img: 'assets/photos/FONTMARTIN.David.jpg' },
    { id: 'adel.amri@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Adel Amri', title: 'Solution Architect', img: 'assets/photos/Adel.Amri.jpg' },
    { id: 'mohamed.yousuf@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Mohamed Yousuf Sulaiman', title: 'Solution Architect', img: 'assets/photos/Mohamed.Yousuf.jpg' },
    { id: 'w.kaddour-ext@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Walid Kaddour', title: 'Solution Architect (TN)', img: 'assets/photos/Walid_Kaddour.jpg'},

    /* TQ */
    { id: 'simon.ravier@intersec.com', pid:'emilien.coffin@intersec.com', stpid: 'ps-tq', name: 'Simon Ravier', title: 'Integration Technical Lead', img: 'assets/photos/Ravier.Simon.png' },
    { id: 'jonas.prieur@intersec.com', pid: 'simon.ravier@intersec.com', name: 'Jonas Prieur', title: 'Integration Engineer', img: 'assets/photos/Jonas.PRIEUR.jpg' },
    { id: 'alexandre.riquier@intersec.com', pid: 'simon.ravier@intersec.com', name: 'Alexandre Riquier', title: 'Integration Engineer', img: 'assets/photos/Alexandre_Riquier.jpg' },

    /* Europe */
    { id: 'emilien.coffin@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-europe', name: 'Emilien Coffin', title: 'Leader of Integration Process', tags: ['management'], img: 'assets/photos/COFFIN.Emilien.JPG' },
    { id: 'djamila.bendjafar@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Djamila Bendjafar', title: 'Project Manager', img: 'assets/photos/Benjafar.Djamila.jpg' },
    { id: 'maja.lazarevska@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Maja Lazarevska', title: 'Project Manager', img: 'assets/photos/Lazarevska.Maja.jpg' },
    { id: 'jean.huber@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Jean Huber', title: 'Project Manager', img: 'assets/photos/Jean.Huber.png' },
    { id: 'nadia.traore@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Nadia Traoré', title: 'Project Manager', img: 'assets/photos/Nadia.Traore.jpg' },
    { id: 'alexandre.prengere@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Alexandre Prengere', title: 'Project Manager', img: 'assets/photos/Alexandre.Prengere.jpg' },
    { id: 'xavier.afyouni@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Xavier Afyouni', title: 'IT Trainer', img: 'assets/photos/Xavier_AFYOUNI.jpg'},
    { id: 'elie.elhamawi@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Elie El Hamawi', title: 'Integration Engineer', img: 'assets/photos/Elie.ElHamawi.jpg' },
    { id: 'sirine.ibrahim@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Sirine Ibrahim', title: 'Integration Engineer', img: 'assets/photos/Ibrahim.Sirine.png' },
    { id: 'reshmi.anand@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Reshmi Anand', title: 'Integration Engineer', img: 'assets/photos/Reshmi.Anand.jpg' },
    { id: 'chiheb.bestaoui@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Chiheb Bestaoui', title: 'Integration Engineer', img: 'assets/photos/chiheb_bestaoui.jpg'},
    { id: 'jerome.levol@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Jérôme Levol', title: 'Integration Engineer', img: 'assets/photos/Jerome.Levol.jpg'},
    { id: 'filip.biljic@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Filip Biljic', title: 'Integration Engineer', img: 'assets/photos/Filip.Biljic.jpg'},
    { id: 'l.chalouati-ext@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Latifa Chalouati', title: 'Integration Engineer', img: 'assets/photos/Latifa_Chalouati.jpg'},
    { id: 'd.belghoul-ext@intersec.com', pid: 'emilien.coffin@intersec.com', name: 'Djamel-Eddine Belghoul', title: 'Integration Engineer', img: 'assets/photos/Djamel.Eddine.Belghoul.jpg'},

    /* Middle East */
    { id: 'haytham.beshir@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-eeme', tags: ['management'], name: 'Haytham Beshir', title: 'Program Manager', img: 'assets/photos/beshir.haytham.jpg' },
    { id: 'mohamad.dib@intersec.com', pid: 'haytham.beshir@intersec.com', name: 'Mohamad Dib', title: 'Integration Engineer', img: 'assets/photos/dib.mohamad.png' },
    { id: 'preeti', pid: 'haytham.beshir@intersec.com', name: 'Preeti AGGARWAL', title: 'Managed Service Expert - DUBAI', img: 'assets/photos/Preeti_AGGARWAL.jpg' },
    { id: 'anand.panwar', pid: 'haytham.beshir@intersec.com', name: 'Anand PANWAR', title: 'Integration Engineer', img: 'assets/photos/Anand.Panwar.jpg' },
    { id: 'neeraj', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-eeme', tags: ['management'], name: 'Neeraj BHATNAGAR', title: 'Project Manager', img: 'assets/photos/Neeraj_BHATNAGAR.jpg' },
    { id: 'naveen', pid: 'neeraj', name: 'Naveen KUMAR', title: 'Solution Architect - DUBAI', img: 'assets/photos/Naveen_KUMAR.jpg' },
    { id: 'mohamed.aboelnoor@intersec.com', pid: 'neeraj', name: 'Mohamed Aboelnoor', title: 'Integration Engineer (Egypt)', img: 'assets/photos/Aboelnoo.Mohamed.png' },
    { id: 'anas.mohamed@intersec.com', pid: 'neeraj', name: 'Anas Mohamed', title: 'Integration Engineer (Egypt)', img: 'assets/photos/Anas_Mohamed.jpg' },

    /* Americas */
    { id: 'matthias.granger@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-americas', tags: ['management'], name: 'Matthias Granger', title: 'Project Manager & Regional TL', img: 'assets/photos/granger.matthias.jpg' },
    { id: 'curtis.jameson@intersec.com', pid: 'matthias.granger@intersec.com', name: 'Curtis Jameson', title: 'Integration Engineer', img: 'assets/photos/Jameson.Curtis.png' },
    { id: 'sneha.dhotre', pid: 'matthias.granger@intersec.com', name: 'Sneha DHOTRE', title: 'Integration Engineer', img: 'assets/photos/Sneha_DHOTRE.png'},
    { id: 'gabriel.terrien@intersec.com', pid: 'matthias.granger@intersec.com', name: 'Gabriel Terrien', title: 'Integration Engineer', img: 'assets/photos/terrien.gabriel.jpg' },

    /* Tiger */
    { id: 'skander.souidane@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-tiger', name: 'Skander Souidane', title: 'Tiger Program Manager', img: 'assets/photos/SOUIDANE.Skander.jpg' },
    { id: 'yassin.sekri@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-tiger', name: 'Yassin Sekri', title: 'Integration Engineer', img: '' },
    { id: 'nahin.musarrat@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-tiger', name: 'Nahin Musarrat', title: 'Integration Engineer', img: 'assets/photos/Nahin.Musarrat.png' },

    /* Support */
    { id: 'onur.topcu@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'ps-support', name: 'Onur Topcu', title: 'Support Manager', tags: ['management'], img: 'assets/photos/Topcu.Onur.png' },
    { id: 'djibril.faty@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Djibril Faty', title: 'Support Engineer', img: 'assets/photos/FATY.Djibril.jpg' },
    { id: 'nicolas.legrand@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Nicolas Legrand', title: 'Support Engineer', img: 'assets/photos/LEGRAND.Nicolas.JPG' },
    { id: 'nawaal.mamadou@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Nawaal Mamadou', title: 'Support Engineer', img: 'assets/photos/MAMADOU.Nawaal.jpg' },
    { id: 'victorien.serre@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Victorien Serre', title: 'Support Engineer', img: '' },
    { id: 'ahmed.benmajdouba@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Ahmed BEN MAJDOUBA', title: 'Support Engineer', img: 'assets/photos/Ahmed_BENMAJDOUBA.jpg'},
    { id: 'nikola.milic@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Nikola Milić', title: 'Support Engineer', img: ''},
    { id: 'shabab.vadakkangara@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Shabab Vadakkangara', title: 'Support Engineer (Dubai)', img: 'assets/photos/Shabab.Vadakkangara.jpg' },

    /* External integrators */
    { id: 'm.azaiez-ext@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'tunis-team', name: 'Meryam Azaiez', title: 'Integration Engineer (TN)', img: 'assets/photos/Meryam_Azaiez.jpg'},
    { id: 'm.bensaid-ext@intersec.com', pid: 'mohit.maheshwari@intersec.com', stpid: 'tunis-team', name: 'Mahdi Ben Said', title: 'Integration Engineer (TN)', img: ''},

    /* }}} */
    /* {{{ IT & Cloud */

    { id: 'clement', pid: 'ana', name: 'Clément Vandoolaeghe', title: 'Head of Platform Operations', img: 'assets/photos/Clement.Vandoolaeghe.jpg'},

    /* IT */

    { id: 'kevin.champion@intersec.com', pid: 'clement', stpid: 'it', name: 'Kevin Champion', title: 'IT Manager', img: 'assets/photos/Kevin_Champion.jpg'},
    { id: 'nicolas.sery@intersec.com', pid: 'clement', stpid: 'it', name: 'Nicolas Sery', title: 'System administrator', img: 'assets/photos/Nicolas.Sery.jpg'},

    /* CloudOps */
    { id: 'matthieu.michelet', pid: 'clement', stpid: 'cloudops', name: 'Matthieu Michelet', title: 'Site Reliability Engineer', img: 'assets/photos/matthieu_michelet.jpg'},
    { id: 'bree', stpid: 'cloudops', pid: 'clement', name: 'Simon Bree', title: 'Site Reliability Engineer', img: 'assets/photos/Bree.simon.jpg'},

    /* }}} */
    /* {{{ HR */

    { id: 'oyo.ndoro@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'hr-team', tags: ['management'], name: 'Oyo NDoro', title: 'VP Talent', img: 'assets/photos/NDORO.Oyo.jpg'},
    { id: 'rkia.hatif@intersec.com', pid: 'oyo.ndoro@intersec.com', name: 'Rkia Hatif', title: 'Payroll and Administrative Manager', img: 'assets/photos/hatif.rkia.png' },
    { id: 'sarra.benslimen@intersec.com', pid: 'rkia.hatif@intersec.com', name: 'Sarra Ben Slimen', title: 'HR Assistant', img: 'assets/photos/Sara.Ben.Slimane.jpg' },
    { id: 'kamel.majdoub@intersec.com', pid: 'oyo.ndoro@intersec.com', name: 'Kamel Majdoub', title: 'Recruitment Manager', img: 'assets/photos/majdoub.kamel.png' },
    { id: 'samy.kammoun@intersec.com', pid: 'kamel.majdoub@intersec.com', name: 'Samy KAMMOUN', title: 'Recruitment Assistant', img: 'assets/photos/Samy.Kammoun.jpg' },
    { id: 'anne-laurence.zanclan@intersec.com', pid: 'oyo.ndoro@intersec.com', name: 'Anne-Laurence Zanclan', title: 'Hiring Consultant', img: 'assets/photos/ZANCLAN.Anne-Laurence.jpg' },

    /* }}} */
    /* {{{ Accounting */

    { id: 'nicolas.rousseau-dumarcet@intersec.com', pid: 'yann.chevalier@intersec.com', stpid: 'accounting', tags: ['management'], name: 'Nicolas Rousseau Dumarcet', title: 'CFO', img: 'assets/photos/Nicolas.Rousseau-Dumarcet.jpg'},
    { id: 'caroline.dumaitre@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', name: 'Caroline Dumaitre', title: 'Accounting and Financial Manager', img: 'assets/photos/Dumaitre.Caroline.png' },
    { id: 'isabelle.granger@intersec.com', pid: 'caroline.dumaitre@intersec.com', name: 'Isabelle Granger', title: 'General Accountant', img: 'assets/photos/Granger.Isabelle.jpeg' },
    { id: 'sanh.nguyen@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', name: 'Sanh Nguyen', title: 'Senior FP&A Analyst', img: 'assets/photos/Sanh_NGUYEN.jpg' },
    { id: 'mouna.benzaroual@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', name: 'Mouna Benzaroual', title: 'Sales Administration Manager', img: 'assets/photos/Mouna.Benzaroual.jpg' },

    /* }}} */
];

// Call the function with your array
createTeamFolders(teamArray);
