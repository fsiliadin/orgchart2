
window.onload = function () {

    const members = [
        /* {{{ Departments */

        { id: 'top-management', tags: ['top-management'] },

        { id: 'rd-team', pid: 'top-management', tags: ['department', 'rd-team'], name: 'R&D' },
        { id: 'sales-team', pid: 'top-management', tags: ['department', 'sales-team'], name: 'Revenue' },
        { id: 'pdm-team', pid: 'top-management', tags: ['department', 'pdm-team'], name: 'Product' },
        { id: 'ps-team', pid: 'top-management', tags: ['department', 'ps-team'], name: 'Professional Services' },
        { id: 'accounting', pid: 'top-management', tags: ['department', 'accounting'], name: 'Accounting' },
        { id: 'it-team', pid: 'top-management', tags: ['department', 'it-team'], name: 'IT & Cloud Operations' },
        { id: 'hr-team', pid: 'top-management', tags: ['department', 'hr-team'], name: 'HR' },
        { id: 'mkt-team', pid: 'top-management', tags: ['department', 'mkt-team'], name: 'Marketing' },

        /* }}} */
        /* {{{ CEO */

        { id: 'yann.chevalier@intersec.com', stpid: 'top-management', tags: ['management'], name: 'Yann Chevalier', title: 'CEO', img: 'assets/photos/CHEVALIER.Yann.jpg' },

        /* }}} */
        /* {{{ Marketing */

        { id: 'cardona', stpid: 'mkt-team', tags: ['management'], name: 'Charlotte Cardona', title: 'Marketing & Communication Director', img: 'assets/photos/Cardona.Charlotte.png'},
        { id: 'thomas.grahamwood', pid: 'cardona', name: 'Thomas Graham-Wood', title: 'Marketing and Communication Specialist', img: 'assets/photos/Thomas_GRAHAM-WOOD.jpg'},
        { id: 'marie-luna', pid: 'cardona', name: 'Marie-Luna Gonzalez', title: 'Marketing and Social Networking Apprentice', img: 'assets/photos/Marie.Luna.Gonzalez.jpg'},

        /* }}} */
        /* {{{ PDM */

        { id: 'christophe.nez@intersec.com', stpid: 'pdm-team', tags: ['management'], name: 'Christophe Nez', title: 'VP Product Marketing', img: 'assets/photos/NEZ.christophe.png'},
        { id: 'charlotte.thomas', pid: 'christophe.nez@intersec.com', name: 'Charlotte Thomas', title: 'Cloud Offering Director', img: 'assets/photos/Charlotte_THOMAS.jpg'},
        { id: 'sebastien.synold', pid: 'christophe.nez@intersec.com', name: 'Sébastien Synold', title: 'Product Manager', img: 'assets/photos/Sebastien_SYNOLD.jpg'},

        /* }}} */
        /* {{{ R&D */

        /* Head */
        { id: 'ana', stpid: 'rd-team', tags: ['management'], name: 'Jean-Marc Coïc', title: 'CTO', img: 'assets/photos/COIC.Jean-Marc.jpg'},
        { id: 'kamal', pid: 'ana', tags: ['management'], name: 'Kamal Fadlaoui', title: 'VP Engineering', img: 'assets/photos/Fadlaoui.Kamal.jpg'},
        { id: 'moha', pid: 'ana', tags: ['management'], name: 'Mohamed Kahlal', title: 'VP Engineering Delivery', img: 'assets/photos/KAHLAL.mohamed.png'},

        /* Teams */
        { id: 'po', pid: 'kamal', name: 'Product Owner', tags: ['team']},
        { id: 'data-science', pid: 'ana', name: 'Data Science', tags: ['team']},
        { id: 'bogops', pid: 'kamal', name: 'DevOps', tags: ['team']},
        { id: 'transverse', pid: 'kamal', name: 'Transverse', tags: ['team']},
        { id: 'palladium', pid: 'moha', name: 'Palladium', tags: ['team']},
        { id: 'cobalt', pid: 'moha', name: 'Cobalt', tags: ['team']},
        { id: 'telco', pid: 'moha', name: 'Telco', tags: ['team']},
        { id: 'innovia1', pid: 'rd-team', name: 'Palladium - Contractors', tags: ['extern']},
        { id: 'innovia2', pid: 'rd-team', name: 'Cobalt - Contractors', tags: ['extern']},

        /* PO */
        { id: 'chef-po', stpid: 'po', name: 'TBR', title: 'Team Leader Product Owner', img: ''},
        { id: 'mas', stpid: 'po', name: 'Vincent Mas', title: 'Product Owner', img: 'assets/photos/Mas.Vincent.png'},
        { id: 'yohann', stpid: 'po', name: 'Yohann Balawender', title: 'Product Owner', img: 'assets/photos/Balawander.Yohann.jpg'},
        { id: 'marwane', stpid: 'po', name: 'Marwane Akram', title: 'Product Owner', img: 'assets/photos/AKRAM.Marwane.jpg'},
        { id: 'amer', stpid: 'po', name: 'Amer Bdeoui', title: 'Product Owner', img: 'assets/photos/Bdoui.Amer.png'},
        { id: 'alex.slavutskyi@intersec.com', stpid: 'po', name: 'Alex Slavutskyi', title: 'UX/UI Designer', img: 'assets/photos/Alex.Slavutskyi.jpg'},

        /* Data Science */
        { id: 'cuny', stpid: 'data-science', name: 'Pierre-Louis Cuny', title: 'Data Science Team Lead', img: 'assets/photos/CUNY.Pierre-Louis.jpg'},
        { id: 'gosset', pid: 'cuny', name: 'Christophe Gosset', title: 'Data Scientist', img: 'assets/photos/Gosset.Christophe.jpg'},
        { id: 'killian', pid: 'cuny', name: 'Killian Le Goff', title: 'Data Scientist', img: 'assets/photos/Killian_LeGoff.jpg'},

        /* BogOps */
        { id: 'marchand', stpid: 'bogops', name: 'Fabien Marchand', title: 'DevOps Engineer', img: 'assets/photos/MARCHAND.Fabien.jpg'},
        { id: 'angevelle', stpid: 'bogops', name: 'Nicolas Angevelle', title: 'DevOps Engineer', img: 'assets/photos/ANGEVELLE.Nicolas.JPG'},
        { id: 'aline.fauquette@intersec.com', stpid: 'bogops', name: 'Aline Fauquette', title: 'DevOps Engineer', img: 'assets/photos/Fauquette.Aline.jpg'},

        /* Transverse */
        { id: 'jonathan.squirawski', stpid: 'transverse', name: 'Jonathan Squirawski', title: 'Software Architect', img: 'assets/photos/Jonathan_Squirawski.jpg'},
        { id: 'sebastien', stpid: 'transverse', name: 'Sebastien Thouément', title: 'Software Architect', img: 'assets/photos/THOUEMENT.Sebastien.JPG'},
        { id: 'mariat', stpid: 'transverse', name: 'Benoit Mariat', title: 'Software Architect', img: 'assets/photos/Mariat.benoit.jpg'},
        { id: 'christele', stpid: 'transverse', name: 'Christèle Camara', title: 'Technical Documentation Manager', img: 'assets/photos/Camara.Christele.jpg'},
        { id: 'oceane', pid: 'christele', name: 'Océane Boudinet', title: 'Technical Documentation Writer', img: 'assets/photos/Oceane_BOUDINET.jpg'},

        /* Palladium */
        { id: 'alexis', stpid: 'palladium', name: 'Alexis Brasy', title: 'Team Leader', img: 'assets/photos/Brasy.Alexis.jpg'},
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
        { id: 'nassim.mnafeg', stpid: 'cobalt', name: 'Nassim Mnafeg', title: 'Team Leader', img: 'assets/photos/Nassim_MNAFEG.jpg'},
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
        { id: 'rawad', stpid: 'telco', name: 'Rawad Zgheib', title: 'Team Leader', img: 'assets/photos/Rawad_Zgheib.png'},
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
        { id: 'yacine', stpid: 'innovia1', name: 'Yacine Boudiaf', title: 'Developer', img: 'assets/photos/Boudiaf.Yacine.jpg'},

        /* Cobalt contractors */
        { id: 'imen', stpid: 'innovia2', name: 'Imen Benabdallah', title: 'Continuous Integrator', img: 'assets/photos/Imen_BENABDALLAH.jpg'},
        { id: 'amira', stpid: 'innovia2', name: 'Amira Hadjer Bouali', title: 'Developer', img: 'assets/photos/Bouali.Amira.jpg'},
        { id: 'djamel', stpid: 'innovia2', name: 'Djamel-Eddine Meharga', title: 'Developer', img: 'assets/photos/Meharga.Djamel.jpg'},
        { id: 'dihia', stpid: 'innovia2', name: 'Dihia Salhi', title: 'Continuous Integrator', img: 'assets/photos/Dihia_SALHI.jpg'},


        /* }}} */
        /* {{{ Sales */

        { id: 'ingolf.ruh@intersec.com', stpid: 'sales-team', tags: ['management'], name: 'Ingolf Ruh', title: 'CRO', img: 'assets/photos/RUH.Ingolf.jpg'},

        /* Teams */
        { id: 'europe', pid: 'ingolf.ruh@intersec.com', name: 'Europe and Africa', tags: ['team']},
        { id: 'sales-eu', stpid: 'europe', name: 'Sales', tags: ['sales-presales']},
        { id: 'presales-eu', stpid: 'europe', name: 'Pre Sales', tags: ['sales-presales']},
        { id: 'sdr', stpid: 'europe', name: 'Sales Development Representative', tags: ['sales-presales']},
        { id: 'eeme', pid: 'ingolf.ruh@intersec.com', name: 'Middle East', tags: ['team']},
        { id: 'sales-eeme', stpid: 'eeme', name: 'Sales', tags: ['sales-presales']},
        { id: 'presales-eeme', stpid: 'eeme', name: 'Pre Sales', tags: ['sales-presales']},
        { id: 'americas', pid: 'ingolf.ruh@intersec.com', name: 'Americas', tags: ['team']},
        { id: 'sales-americas', stpid: 'americas', name: 'Sales', tags: ['sales-presales']},
        { id: 'presales-americas', stpid: 'americas', name: 'Pre Sales', tags: ['sales-presales']},
        { id: 'apac', pid: 'ingolf.ruh@intersec.com', name: 'APAC', tags: ['team']},
        { id: 'sales-apac', stpid: 'apac', name: 'Sales', tags: ['sales-presales']},
        { id: 'presales-apac', stpid: 'apac', name: 'Pre Sales', tags: ['sales-presales']},

        /* WEA */
        { id: 'arnaud.westphal@intersec.com', stpid: 'sales-eu', name: 'Arnaud Westphal', title: 'VP Sales', tags: ['management'], img: 'assets/photos/WESTPHAL.Arnaud.JPG' },
        { id: 'ali.houssni@intersec.com', stpid: 'presales-eu', name: 'Ali Houssni', title: 'Presales', img: 'assets/photos/Houssni.Ali.jpg' },
        { id: 'cedrick.vero@intersec.com', stpid: 'presales-eu', name: 'Cédrick Vero', title: 'Presales', img: 'assets/photos/Vero.Cedrick.png' },
        { id: 'chloe', stpid: 'presales-eu', name: 'Chloé MAROUN', title: 'Presales', img: 'assets/photos/Chloe_MAROUN.jpg' },
        { id: 'ahmed.lyahou@intersec.com', stpid: 'presales-eu', name: 'Ahmed LYAHOU', title: 'Presales', img: 'assets/photos/Ahmed_LYAHOU.jpg' },
        { id: 'nicolas.haddad@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Nicolas Haddad', title: 'Regional Sales Manager', img: 'assets/photos/haddad.Nicolas.jpg' },
        { id: 'thomas.marquis@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Thomas Marquis', title: 'Regional Sales Manager', img: 'assets/photos/Marquis.Thomas.jpg' },
        { id: 'nicolas.delaunay@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Nicolas Delaunay', title: 'Regional Sales Manager', img: 'assets/photos/Delaunay.Nicolas.jpg' },
        { id: 'souad.touil@intersec.com', pid: 'arnaud.westphal@intersec.com', name: 'Souad Touil', title: 'Regional Sales Director', img: 'assets/photos/TOUIL.Souad.JPG' },

        /* Trela */
        { id: 'alexandre.quince@intersec.com', stpid:'sdr', name: 'Alexandre Quincé', title: 'Sales Development Representative', img: 'assets/photos/Alexandre.QUINCE.jpg'},

        /* EEME */
        { id: 'ahmed.hamza@intersec.com', stpid: 'sales-eeme', name: 'Ahmed Hamza', title: 'VP Sales', tags: ['management'], img: 'assets/photos/HAMZA.Ahmed.jpg' },
        { id: 'fehmi.sanaa', pid: 'ahmed.hamza@intersec.com', name: 'Fehmi SANAA', title: 'Regional Sales Manager - Dubai', img: 'assets/photos/Fehmi_SANAA.jpg' },
        { id: 'abdurrahim.suslu', pid: 'ahmed.hamza@intersec.com', name: 'Abdurrahim SUSLU', title: 'Regional Sales Manager - Dubai', img: 'assets/photos/Abdurrahim_SUSLU.jpg' },

        { id: 'tarek.tarawneh@intersec.com', stpid: 'presales-eeme', name: 'Tarek Al Tarawneh', title: 'Presales', img: 'assets/photos/Tarawneh.Tarek.png' },
        { id: 'mohammed.abbas@intersec.com', stpid: 'presales-eeme', name: 'Mohammed Abbas', title: 'Presales', img: 'assets/photos/Mohamed.Abas.jpg' },

        /* Americas */
        { id: 'tom.mcewan@intersec.com', stpid: 'sales-americas', name: 'Tom McEwan', title: 'Regional Sales Manager', img: 'assets/photos/mcewan.Tom.JPG' },
        { id: 'stephane.jutras', stpid: 'presales-americas', name: 'Stéphane Jutras', title: 'Presales', img: 'assets/photos/Stephane_JUTRAS.jpg' },

        /* APAC */
        { id: 'kurian.manjakkal@intersec.com', stpid: 'sales-apac', name: 'Kurian Manjakkal', title: 'VP Sales', tags: ['management'], img: 'assets/photos/Manjakkal.Kurian.jpg'},
        { id: 'yonghaw.goh', stpid: 'presales-apac', name: 'Yonghaw GOH', title: 'Pre Sales', img: 'assets/photos/Yonghaw_GOH.jpg'},


        /* }}} */
        /* {{{ PS */

        /* Teams */
        { id: 'sa-team', pid: 'mohit.maheshwari@intersec.com', name: 'Solution Architects', tags: ['team']},
        { id: 'ps-europe', pid: 'mohit.maheshwari@intersec.com', name: 'Europe', tags: ['team']},
        { id: 'ps-eeme', pid: 'mohit.maheshwari@intersec.com', name: 'Middle East', tags: ['team']},
        { id: 'ps-americas', pid: 'mohit.maheshwari@intersec.com', name: 'Americas', tags: ['team']},
        { id: 'ps-tiger', pid: 'mohit.maheshwari@intersec.com', name: 'Tiger Program', tags: ['team']},
        { id: 'ps-support', pid: 'mohit.maheshwari@intersec.com', name: 'Support', tags: ['team']},

        { id: 'ps-tq', pid: 'emilien.coffin@intersec.com', name: 'Integration Quality', tags: ['ps-subteam']},
        { id: 'tunis-team', pid: 'mohit.maheshwari@intersec.com', name: 'Sofrecom', tags: ['ps-subteam']},

        /* Management */
        { id: 'mohit.maheshwari@intersec.com', stpid: 'ps-team', tags: ['management'], name: 'Mohit Maheshwari', title: 'VP Operations', img: 'assets/photos/Maheshwari.Mohit.jpg'},

        /* SA */
        { id: 'nicolas.najman@intersec.com', stpid: 'sa-team', tags: ['management'], name: 'Nicolas Najman', title: 'SA Director', img: 'assets/photos/najman.nicolas.png' },
        { id: 'abdelmoula.elousfour@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Abdelmoula El Ousfour', title: 'Solution Architect', img: 'assets/photos/Abdelmoula.Elousfour.jpg' },
        { id: 'imad.zinade@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Imad Zidane', title: 'Solution Architect', img: 'assets/photos/Imad_ZIDANE.jpg' },
        { id: 'aneep.srivastava@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Aneep Srivastava', title: 'Solution Architect', img: 'assets/photos/Srivastava.Aneep.png' },
        { id: 'braulio.castillo@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Braulio Castillo', title: 'Solution Architect', img: 'assets/photos/Castillo.Braulio.jpg' },
        { id: 'david.fontmartin@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'David Fontmartin', title: 'Solution Architect', img: 'assets/photos/FONTMARTIN.David.jpg' },
        { id: 'adel.amri@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Adel Amri', title: 'Solution Architect', img: 'assets/photos/Adel.Amri.jpg' },
        { id: 'mohamed.yousuf@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Mohamed Yousuf Sulaiman', title: 'Solution Architect', img: 'assets/photos/Mohamed.Yousuf.jpg' },
        { id: 'w.kaddour-ext@intersec.com', pid: 'nicolas.najman@intersec.com', name: 'Walid Kaddour', title: 'Solution Architect (TN)', img: 'assets/photos/Walid_Kaddour.jpg'},

        /* TQ */
        { id: 'simon.ravier@intersec.com', stpid: 'ps-tq', name: 'Simon Ravier', title: 'Integration Technical Lead', img: 'assets/photos/Ravier.Simon.png' },
        { id: 'jonas.prieur@intersec.com', pid: 'simon.ravier@intersec.com', name: 'Jonas Prieur', title: 'Integration Engineer', img: 'assets/photos/Jonas.PRIEUR.jpg' },
        { id: 'alexandre.riquier@intersec.com', pid: 'simon.ravier@intersec.com', name: 'Alexandre Riquier', title: 'Integration Engineer', img: 'assets/photos/Alexandre_Riquier.jpg' },

        /* Europe */
        { id: 'emilien.coffin@intersec.com', stpid: 'ps-europe', name: 'Emilien Coffin', title: 'Leader of Integration Process', tags: ['management'], img: 'assets/photos/COFFIN.Emilien.JPG' },
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
        { id: 'haytham.beshir@intersec.com', stpid: 'ps-eeme', tags: ['management'], name: 'Haytham Beshir', title: 'Program Manager', img: 'assets/photos/beshir.haytham.jpg' },
        { id: 'mohamad.dib@intersec.com', pid: 'haytham.beshir@intersec.com', name: 'Mohamad Dib', title: 'Integration Engineer', img: 'assets/photos/dib.mohamad.png' },
        { id: 'preeti', pid: 'haytham.beshir@intersec.com', name: 'Preeti AGGARWAL', title: 'Managed Service Expert - DUBAI', img: 'assets/photos/Preeti_AGGARWAL.jpg' },
        { id: 'anand.panwar', pid: 'haytham.beshir@intersec.com', name: 'Anand PANWAR', title: 'Integration Engineer', img: 'assets/photos/Anand.Panwar.jpg' },
        { id: 'neeraj', stpid: 'ps-eeme', tags: ['management'], name: 'Neeraj BHATNAGAR', title: 'Project Manager', img: 'assets/photos/Neeraj_BHATNAGAR.jpg' },
        { id: 'naveen', pid: 'neeraj', name: 'Naveen KUMAR', title: 'Solution Architect - DUBAI', img: 'assets/photos/Naveen_KUMAR.jpg' },
        { id: 'mohamed.aboelnoor@intersec.com', pid: 'neeraj', name: 'Mohamed Aboelnoor', title: 'Integration Engineer (Egypt)', img: 'assets/photos/Aboelnoo.Mohamed.png' },
        { id: 'anas.mohamed@intersec.com', pid: 'neeraj', name: 'Anas Mohamed', title: 'Integration Engineer (Egypt)', img: 'assets/photos/Anas_Mohamed.jpg' },

        /* Americas */
        { id: 'matthias.granger@intersec.com', stpid: 'ps-americas', tags: ['management'], name: 'Matthias Granger', title: 'Project Manager & Regional TL', img: 'assets/photos/granger.matthias.jpg' },
        { id: 'curtis.jameson@intersec.com', pid: 'matthias.granger@intersec.com', name: 'Curtis Jameson', title: 'Integration Engineer', img: 'assets/photos/Jameson.Curtis.png' },
        { id: 'sneha.dhotre', pid: 'matthias.granger@intersec.com', name: 'Sneha DHOTRE', title: 'Integration Engineer', img: 'assets/photos/Sneha_DHOTRE.png'},
        { id: 'gabriel.terrien@intersec.com', pid: 'matthias.granger@intersec.com', name: 'Gabriel Terrien', title: 'Integration Engineer', img: 'assets/photos/terrien.gabriel.jpg' },

        /* Tiger */
        { id: 'skander.souidane@intersec.com', stpid: 'ps-tiger', name: 'Skander Souidane', title: 'Tiger Program Manager', img: 'assets/photos/SOUIDANE.Skander.jpg' },
        { id: 'yassin.sekri@intersec.com', stpid: 'ps-tiger', name: 'Yassin Sekri', title: 'Integration Engineer', img: '' },
        { id: 'nahin.musarrat@intersec.com', stpid: 'ps-tiger', name: 'Nahin Musarrat', title: 'Integration Engineer', img: 'assets/photos/Nahin.Musarrat.png' },

        /* Support */
        { id: 'onur.topcu@intersec.com', stpid: 'ps-support', name: 'Onur Topcu', title: 'Support Manager', tags: ['management'], img: 'assets/photos/Topcu.Onur.png' },
        { id: 'djibril.faty@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Djibril Faty', title: 'Support Engineer', img: 'assets/photos/FATY.Djibril.jpg' },
        { id: 'nicolas.legrand@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Nicolas Legrand', title: 'Support Engineer', img: 'assets/photos/LEGRAND.Nicolas.JPG' },
        { id: 'nawaal.mamadou@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Nawaal Mamadou', title: 'Support Engineer', img: 'assets/photos/MAMADOU.Nawaal.jpg' },
        { id: 'victorien.serre@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Victorien Serre', title: 'Support Engineer', img: '' },
        { id: 'ahmed.benmajdouba@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Ahmed BEN MAJDOUBA', title: 'Support Engineer', img: 'assets/photos/Ahmed_BENMAJDOUBA.jpg'},
        { id: 'nikola.milic@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Nikola Milić', title: 'Support Engineer', img: ''},
        { id: 'shabab.vadakkangara@intersec.com', pid: 'onur.topcu@intersec.com', name: 'Shabab Vadakkangara', title: 'Support Engineer (Dubai)', img: 'assets/photos/Shabab.Vadakkangara.jpg' },

        /* External integrators */
        { id: 'm.azaiez-ext@intersec.com', stpid: 'tunis-team', name: 'Meryam Azaiez', title: 'Integration Engineer (TN)', img: 'assets/photos/Meryam_Azaiez.jpg'},
        { id: 'm.bensaid-ext@intersec.com', stpid: 'tunis-team', name: 'Mahdi Ben Said', title: 'Integration Engineer (TN)', img: ''},

        /* }}} */
        /* {{{ IT & Cloud */

        { id: 'ana2', stpid: 'it-team', tags: ['management'], name: 'Jean-Marc Coïc', title: 'CTO', img: 'assets/photos/COIC.Jean-Marc.jpg'},
        { id: 'clement', pid: 'ana2', name: 'Clément Vandoolaeghe', title: 'Head of Platform Operations', img: 'assets/photos/Clement.Vandoolaeghe.jpg'},
        { id: 'cloudops', pid: 'clement', name: 'CloudOps', tags: ['team']},
        { id: 'it', pid: 'clement', name: 'IT', tags: ['team']},

        /* IT */

        { id: 'kevin.champion@intersec.com', stpid: 'it', name: 'Kevin Champion', title: 'IT Manager', img: 'assets/photos/Kevin_Champion.jpg'},
        { id: 'nicolas.sery@intersec.com', stpid: 'it', name: 'Nicolas Sery', title: 'System administrator', img: 'assets/photos/Nicolas.Sery.jpg'},

        /* CloudOps */
        { id: 'matthieu.michelet',stpid: 'cloudops', name: 'Matthieu Michelet', title: 'Site Reliability Engineer', img: 'assets/photos/matthieu_michelet.jpg'},
        { id: 'bree', stpid: 'cloudops', name: 'Simon Bree', title: 'Site Reliability Engineer', img: 'assets/photos/Bree.simon.jpg'},

        /* }}} */
        /* {{{ HR */

        { id: 'oyo.ndoro@intersec.com', stpid: 'hr-team', tags: ['management'], name: 'Oyo NDoro', title: 'VP Talent', img: 'assets/photos/NDORO.Oyo.jpg'},
        { id: 'rkia.hatif@intersec.com', pid: 'oyo.ndoro@intersec.com', name: 'Rkia Hatif', title: 'Payroll and Administrative Manager', img: 'assets/photos/hatif.rkia.png' },
        { id: 'sarra.benslimen@intersec.com', pid: 'rkia.hatif@intersec.com', name: 'Sarra Ben Slimen', title: 'HR Assistant', img: 'assets/photos/Sara.Ben.Slimane.jpg' },
        { id: 'kamel.majdoub@intersec.com', pid: 'oyo.ndoro@intersec.com', name: 'Kamel Majdoub', title: 'Recruitment Manager', img: 'assets/photos/majdoub.kamel.png' },
        { id: 'samy.kammoun@intersec.com', pid: 'kamel.majdoub@intersec.com', name: 'Samy KAMMOUN', title: 'Recruitment Assistant', img: 'assets/photos/Samy.Kammoun.jpg' },
        { id: 'anne-laurence.zanclan@intersec.com', pid: 'oyo.ndoro@intersec.com', name: 'Anne-Laurence Zanclan', title: 'Hiring Consultant', img: 'assets/photos/ZANCLAN.Anne-Laurence.jpg' },

        /* }}} */
        /* {{{ Accounting */

        { id: 'nicolas.rousseau-dumarcet@intersec.com', stpid: 'accounting', tags: ['management'], name: 'Nicolas Rousseau Dumarcet', title: 'CFO', img: 'assets/photos/Nicolas.Rousseau-Dumarcet.jpg'},
        { id: 'caroline.dumaitre@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', name: 'Caroline Dumaitre', title: 'Accounting and Financial Manager', img: 'assets/photos/Dumaitre.Caroline.png' },
        { id: 'isabelle.granger@intersec.com', pid: 'caroline.dumaitre@intersec.com', name: 'Isabelle Granger', title: 'General Accountant', img: 'assets/photos/Granger.Isabelle.jpeg' },
        { id: 'sanh.nguyen@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', name: 'Sanh Nguyen', title: 'Senior FP&A Analyst', img: 'assets/photos/Sanh_NGUYEN.jpg' },
        { id: 'mouna.benzaroual@intersec.com', pid: 'nicolas.rousseau-dumarcet@intersec.com', name: 'Mouna Benzaroual', title: 'Sales Administration Manager', img: 'assets/photos/Mouna.Benzaroual.jpg' },

        /* }}} */
    ];

    /* {{{ Configuration - do not change */

    const organization = {
        "top-management": {
            template: "invisibleGroup",
            subTreeConfig: {
                orientation: OrgChart.orientation.bottom,
                collapse: {
                    level: 1,
                },
            },
        },
        "department": {
            template: "group",
            subTreeConfig: {
                layout: OrgChart.tree,
                collapse: {
                    level: 2,
                },
            },
        },
        "team": {
            template: "group",
            subTreeConfig: {
                siblingSeparation: 3,
                columns: 2,
                layout: OrgChart.tree,
                collapse: {
                    level: 1,
                },
            },
        },
        "extern": {
            template: "group",
            subTreeConfig: {
                siblingSeparation: 3,
                columns: 2,
            },
        },
        "sales-presales": {
            template: "group",
            subTreeConfig: {
                layout: OrgChart.treeRightOffset,
                columns: 1,
                collapse: {
                    level: 1,
                },
            },
        },
        "ps-subteam": {
            template: "group",
            subTreeConfig: {
                layout: OrgChart.treeRightOffset,
                columns: 1,
                collapse: {
                    level: 1,
                },
            },
        },
        "management": {
            template: "rony",
        },
    };

   OrgChart.templates.olivia.plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
       + '<text text-anchor="middle" style="font-size: 18px;cursor:pointer;" fill="#757575" x="15" y="22">{collapsed-children-count}</text>';
   OrgChart.templates.olivia.field_0 =
            '<text data-width="145" data-text-overflow="multiline-n" style="font-size: 18px;" fill="#757575" x="100" y="30" text-anchor="left">{val}</text>';
   OrgChart.templates.olivia.field_1 =
            '<text data-width="145" data-text-overflow="multiline-n" style="font-size: 14px;" fill="#757575" x="100" y="80" text-anchor="left">{val}</text>';

   OrgChart.templates.rony.plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
       + '<text text-anchor="middle" style="font-size: 18px;cursor:pointer;" fill="#757575" x="15" y="22">{collapsed-children-count}</text>';
   OrgChart.templates.rony.field_1 =
            '<text data-width="165" data-text-overflow="multiline-n" style="font-size: 14px;" fill="#F57C00" x="30" y="60" text-anchor="left">{val}</text>';

    OrgChart.templates.invisibleGroup.padding = [20, 0, 0, 0];
    OrgChart.MIXED_LAYOUT_ALL_NODES = false;

    function drawWig() {
        const hid = 'fake-hair';
        const xmlns = 'http://www.w3.org/2000/svg';
        const xlink = 'http://www.w3.org/1999/xlink';
        const colors = ['rgba(200, 200, 0, 0.9)', 'rgba(0, 100, 200, 0.95)' ,
            'rgba(0, 250, 100, 0.95)', 'rgba(100, 250, 0, 0.95)', 'rgba(100, 150, 100, 0.95)',
            'rgba(200, 0, 0, 0.95)', 'rgba(0, 200, 0, 0.95)', 'rgba(0, 0, 200, 0.95)'];
        const getColorIdx = () => Math.floor(Math.random() * colors.length);

        const svg = document.querySelector('#tree > svg');
        const defs = svg.querySelector('defs');
        const hair = document.createElementNS(xmlns, 'g');
        const path1 = document.createElementNS(xmlns, 'path');
        const path2 = document.createElementNS(xmlns, 'path');

        hair.setAttributeNS(null, 'viewport', '0 0 100 60');
        hair.setAttributeNS(null, 'viewbox', '0 0 248.62 193.34');
        path1.setAttributeNS(null, 'd', 'm527.71 223.38c0 32.51-18.35 84-35.91 97.53-9.69 7.47-46.35-21.1-45.82-34.53 0.71-18.36 41.77-39.48 49.53-60.83 3.59-9.87-5.33-27.11-15.48-32.82-48.89-27.53-145.47-43.76-161.62-66.88-8.83-12.64 57.8-40.402 86.7-40.402s67.11 18.362 86.69 40.402c21.29 23.94 35.91 65.02 35.91 97.53z');
        path2.setAttributeNS(null, 'd', 'm221.29 223.38c0 32.51 18.35 84 35.91 97.53 9.69 7.47 46.34-21.1 45.82-34.53-0.71-18.35-41.77-39.48-49.53-60.83-3.59-9.87 5.33-27.11 15.48-32.82 48.88-27.53 145.47-43.76 161.62-66.88 8.82-12.64-57.8-40.402-86.7-40.402s-67.11 18.362-86.69 40.402c-21.29 23.94-35.91 65.02-35.91 97.53z');
        hair.id = hid;
        hair.appendChild(path1);
        hair.appendChild(path2);
        defs.appendChild(hair);
        const images = document.querySelectorAll('image');
        for (const img of images) {
            if (!img.href.baseVal.startsWith('assets/photos/')) {
                continue;
            }
            const elUse = document.createElementNS(xmlns, 'use');
            const isMini = img.width.baseVal.value === 80;
            const scale = 0.25 * (isMini ? 0.55 : 1);
            const x = isMini ? img.x.baseVal.value - 12 : 0;
            const y = isMini ? img.y.baseVal.value - 8 : img.y.baseVal.value - 16;
            elUse.setAttributeNS(null, 'x', x / scale);
            elUse.setAttributeNS(null, 'y', y / scale);
            elUse.setAttributeNS(xlink, 'href', '#' + hid);
            elUse.setAttributeNS(null, 'style', `transform:scale(${scale});`);
            elUse.setAttributeNS(null, 'fill', colors[getColorIdx()]);
            img.parentNode.appendChild(elUse);
        }
    }
    var chart = new OrgChart(document.getElementById("tree"), {
        template: "olivia",
        enableDragDrop: false,
        assistantSeparation: 170,
        scaleInitial: OrgChart.match.width,
        mouseScrool: OrgChart.action.scroll,
        nodeMouseClick: OrgChart.action.none,
        enableKeyNavigation: true,
        collapse: {
            level: 2
        },
        menu: {
            //Export functions
            pdfPreview: {
                text: "Export to PDF",
                icon: OrgChart.icon.pdf(24, 24, '#7A7A7A'),
                onClick: preview
            },
        },
        align: OrgChart.ORIENTATION,
        toolbar: {
            fullScreen: true,
            zoom: true,
            fit: true,
            expandAll: true
        },
        nodeBinding: {
            field_0: "name",
            field_1: "title",
            img_0: "img"
        },
        tags: organization,

        clinks: [
            { from: 'innovia1', to: 'alexis' },
            { from: 'innovia2', to: 'nassim.mnafeg' },
        ]
    });

    chart.load(members);

    function preview() {
        OrgChart.pdfPrevUI.show(chart, {
            format: 'A4'
        });
    }

    function nodePdfPreview(nodeId) {
        OrgChart.pdfPrevUI.show(chart, {
            format: 'A4',
            nodeId: nodeId
        });
    }

    /* }}} */
};
