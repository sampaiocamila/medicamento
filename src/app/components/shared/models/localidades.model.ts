export interface UF {
    // Identificador da Unidade da Federação
    id: number;

    // Nome da Unidade da Federação
    nome: string;

    // Sigla da Unidade da Federação
    sigla: string;

    // região
    regiao: Regiao;
}

export interface Regiao {
    // Identificador da Regiao
    id: number;

    // Nome da Regiao
    nome: string;

    // Sigla da Regiao
    sigla: string;
}

export interface Municipio {
    // Identificador do município
    id: number;

    // Nome do município
    nome: string;

    // microrregiao do município
    microrregiao: Microrregiao;
}

export interface Microrregiao {
    // Identificador da Microrregiao
    id: number;

    // Nome da Microrregiao
    nome: string;

    mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
    // Identificador da mesorregião
    id: number;

    // Nome do mesorregião
    nome: string;

    // SUnidade da Federação
    UF: UF;
}

