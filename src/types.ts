type ICWorker = {
    id: string;
    stpid: string;
    name?: string;
    title: string;
    img: string;
    tags?: string[];
};

type Head = ICWorker & {
    isHeadOfDepartment: boolean;
};

type Team = {
    id: string;
    pid: string;
    name: string;
    tags: string[];
};