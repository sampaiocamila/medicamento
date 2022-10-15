
export interface SubClasse {
    //  Identificador da classe
    id: string;
    // Definição da classe
    descricao: string;
    classe: Classe;
    // Atividades relacionadas à subclasse
    atividades: string[];
    // Array de observações da classe
    observacoes: string[];
}

export interface Classe {
    //  Identificador da classe
    id: string;
    // Definição da classe
    descricao: string;
    // Array de observações da classe
    observacoes: string[];
    grupo: Grupo;
}

export interface Grupo {
    id: string;
    descricao: string;
    // Array de observações da classe
    observacoes: string[];
    divisao: Divisao;
}

export interface Divisao {
    id: string;
    descricao: string;
    //  Array de observações da seção
    observacoes: string[];
    secao: Secao;
}

export interface Secao {
    id: string;
    descricao: string;
    //  Array de observações da seção
    observacoes: string[];
}
