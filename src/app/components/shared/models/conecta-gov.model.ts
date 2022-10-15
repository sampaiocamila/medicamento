export class ConsultarCNPJP2Response {
    parameters: {
        ConsultarCNPJP2Result: {
            CNPJPerfil2: [
                {
                    CNPJ: string,
                    Estabelecimento: string,
                    NomeEmpresarial: string,
                    NomeFantasia: string,
                    SituacaoCadastral: string,
                    DataSituacaoCadastral: string,
                    CidadeExterior: string,
                    CodigoPais: string,
                    NomePais: string,
                    NaturezaJuridica: string,
                    DataAbertura: string,
                    CNAEPrincipal: string,
                    CNAESecundario: {
                        string: string[]
                    },
                    TipoLogradouro: string,
                    Logradouro: string,
                    NumeroLogradouro: string,
                    Complemento: string,
                    Bairro: string,
                    CEP: string,
                    UF: string,
                    CodigoMunicipio: string,
                    NomeMunicipio: string,
                    DDD1: string,
                    Telefone1: string,
                    DDD2: string,
                    Telefone2: string,
                    Email: string,
                    Erro: string
                }
            ]
        }
    };

}

export class ConsultarCNPJ {
    parameters: {
        CNPJ: string,
        CPFUsuario: string
    };
}

// Tipos de Campos Retornados
// Tipos de campos Valor de retorno
// NI Número de Inscrição no Cadastro de Pessoa Jurídica, no formato
// 99999999999999
// Data de Abertura Data de abertura da Pessoa Jurídica, no formado AAAA-MM-DD
// Nome Empresarial Nome Empresarial da Pessoa Jurídica
// Nome Fantasia Nome Fantasia da Pessoa Jurídica
// CNAE Principal Informação da Classificação Nacional de Atividades Econômicas
// (CNAE) Principal da Pessoa Jurídica
// Natureza Juirídica Informação da Natureza Jurídica da Pessoa Jurídica
// Endereço Endereço da Pessoa Jurídica
// Situação Especial Situação Especial da Pessoa Jurídica
// Situação Cadastral Situação Cadastral da Pessoa Jurídica
// Órgão Órgão da Pessoa Jurídica
// Tipo de
// Estabelecimento Tipo de Estabelecimento da Pessoa Jurídica
// Correio Eletrônico Correio eletrônico (e-Mail) da Pessoa Jurídica
// Capital Social
// O Capital Social da Pessoa Jurídica é um valor retornado sem
// formatação, porém os 2 últimos dígitos a direita são referentes
// aos centavos. Portanto o valor retornado deve ser dividido por
// 100 para obter o valor real.
// Porte Porte da Pessoa Jurídica
// Telefones Números de Telefone da Pessoa Jurídica
// Nome Órgão Nome do Órgão da Pessoa Jurífica
// Ente Federativo Ente Federativo da Pessoa Jurídica
