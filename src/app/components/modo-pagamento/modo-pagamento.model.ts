export interface ModoPagamentoModel {
    id?: number,
    descricao: string
    taxa : number
    porcentagemDesconto:string
    troco?:boolean
    aVista?:boolean
}
