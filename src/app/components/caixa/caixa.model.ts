export interface CaixaModel {
    id?: number
    nome?: string
    idUsuario?: number

    valorAbertura?: number
    valorFechamento?: number

 
    valorFechamentoDinheiro?: number,
    valorFechamentoPix?: number,
    valorFechamentoCartaoCredito?: number,
    valorFechamentoCartaoDebito?: number,
    valorFechamentoConsignado?: number


    diferencaDinheiro?: number,
    diferencaPix?: number,
    diferencaCartaoCredito?: number,
    diferencaCartaoDebito?: number,
    diferencaConsignado?: number

    valorPagamentoDinheiro?: number,
    valorPagamentoPix?: number,
    valorPagamentoCartaoCredito?: number,
    valorPagamentoCartaoDebito?: number,

    valorPagamentoConsignado?: number

    dataAbertura?:string,
    dataFechamento?:string,
    aberto?:boolean,
}
