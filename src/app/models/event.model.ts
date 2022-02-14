export interface EventPayload {
    title: string;
    author: string;
    environment: string;
    application: string;
    start: Date;
    end: Date;
}

export interface Application {
    idApplication: string;
    application: string;
}

export interface Environment {
    idEnvironment: string;
    environment: string;
}

export interface Author {
    idAuthor: string;
    author: string;
}