(function(){

    /**
     * An array of every team in Intersec represented by an object with the
     * following structure:
     * type Team = {
     *     id: string;
     *     pid: string;
     *     name: string;
     *     tags: string[];
     * };
    */



    const teamsArray: Array<Team> = [
    { id: 'po', pid: 'kamal.fadlaoui@intersec.com', name: 'Product Owner', tags: ['team']},
    { id: 'data-science', pid: 'pierre-louis.cuny@intersec.com', name: 'Data Science', tags: ['team']},
    { id: 'bogops', pid: 'jean-marc.coic@intersec.com', name: 'DevOps', tags: ['team']},
    { id: 'transverse', pid: 'kamal.fadlaoui@intersec.com', name: 'Transverse', tags: ['team']},
    { id: 'engineering', pid: 'mohamed.kahlal@intersec.com', name: 'Engineering', tags: ['team']},
    { id: 'palladium', pid: 'alexis.brasy@intersec.com', name: 'Palladium', tags: ['team']},
    { id: 'cobalt', pid: 'nassim.mnafeg@intersec.com', name: 'Cobalt', tags: ['team']},
    { id: 'telco', pid: 'rawad.zgheib@intersec.com', name: 'Telco', tags: ['team']},
    { id: 'doc', pid: 'christele.camara@intersec.com', name: 'Doc', tags: ['team']},
    { id: 'sa-team', pid: 'nicolas.najman@intersec.com', name: 'Solution Architects', tags: ['team']},
    { id: 'ps-europe', pid: 'emilien.coffin@intersec.com', name: 'Europe', tags: ['team']},
    { id: 'ps-eeme-program', pid: 'haytham.beshir@intersec.com', name: 'Middle East Program', tags: ['team']},
    { id: 'ps-eeme-project', pid: 'neeraj.bhatnagar@intersec.com', name: 'Middle East Project', tags: ['team']},
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
    { id: 'finance', pid: 'caroline.dumaitre@intersec.com', tags: ['accounting'], name: 'Accounting' },
    { id: 'it-team', pid: 'clement.vandoolaeghe@intersec.com', tags: ['department', 'it-team'], name: 'IT & Cloud Operations' },
    { id: 'hr-team', pid: 'oyo.ndoro@intersec.com', tags: ['department', 'hr-team'], name: 'HR' },
    { id: 'hr-recrutement', pid: 'kamel.majdoub@intersec.com', tags: ['team'], name: 'HR' },
    { id: 'hr-administration', pid: 'rkia.hatif@intersec.com', tags: ['team'], name: 'HR' },
    { id: 'mkt-team', pid: 'charlotte.cardona@intersec.com', tags: ['department', 'mkt-team'], name: 'Marketing' },
    { id: 'intersec', pid: 'yann.chevalier@intersec.com', tags: ['company'], name: 'Intersec' },
];

module.exports = teamsArray;
})();