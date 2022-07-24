import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CaixaService } from "../caixa.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { ProdutoModel } from "../../produto/produto.model";
import { CaixaModel } from "../caixa.model";
import { HeaderService } from '../../template/header/header.service';

@Component({
    selector: 'app-fecha-caixa',
    templateUrl: './fecha-caixa.component.html',
    styleUrls: ['./fecha-caixa.component.css']
})
export class FechaCaixaComponent implements OnInit {

    caixa: FormGroup
    caixaF: CaixaModel;
    disable: boolean = true ;

    constructor(private caixaService: CaixaService,
        private router: Router,
        private fb: FormBuilder,
        headerService: HeaderService) {
            headerService.headerData = {
              titulo: 'Fechamento Caixa',
              icone: 'lock',
              routeUrl: '/'
            }
    }

    ngOnInit(): void {
        this.caixa = this.fb.group({
            id: [{ value: '' }],
            nome: [{ value: '', disabled: true }],
            idUsuario: [{ value: '', disabled: true }],

            valorAbertura: [{ value: '', disabled: true }],
            valorFechamento: [{ value: '', disabled: true }],

            valorPagamentoDinheiro: [{ value: 0, disabled: true }],
            valorPagamentoPix: [{ value: '', disabled: true }],
            valorPagamentoCartaoCredito: [{ value: '', disabled: true }],
            valorPagamentoCartaoDebito: [{ value: '', disabled: true }],

            valorPagamentoConsignado: [{ value: '', disabled: true }],



            valorFechamentoDinheiro: [{ value: '', disabled: false }],
            valorFechamentoPix: [{ value: '', disabled: false }],
            valorFechamentoCartaoCredito: [{ value: '', disabled: false }],
            valorFechamentoCartaoDebito: [{ value: '', disabled: false }],

            valorFechamentoConsignado: [{ value: '', disabled: false }],

            diferencaDinheiro: [{ value: '', disabled: true }],
            diferencaPix: [{ value: '', disabled: true }],
            diferencaCartaoCredito: [{ value: '', disabled: true }],
            diferencaCartaoDebito: [{ value: '', disabled: true }],

            diferencaConsignado: [{ value: '', disabled: true }],



            dataAbertura: [{ value: '', disabled: true }],
            dataFechamento: [{ value: '', disabled: true }],
            diferencaAvista: [{ value: '', disabled: true }],
            aberto: [{ value: '', disabled: true }]

        })

        this.getCaixaFechar();
    }

    get c() {
        return this.caixa.controls
    }

    fecharCaixa(): void {

        console.log(this.caixa)
        if (this.caixa.invalid) {
            return;
        }

        //this.caixaF.diferencaAvista = this.caixa.controls.diferencaAvista.value.replace('R$ ', '');
        //this.caixaF.diferencaCartao = this.caixa.controls.diferencaCartao.value.replace('R$ ', '');
        this.caixaF = this.caixa.value;
        this.caixaF.nome = this.caixa.controls.nome.value;
        this.caixaF.valorFechamento = this.caixa.controls.valorFechamento.value ;
        this.caixaF.valorPagamentoCartaoCredito= this.caixa.controls.valorPagamentoCartaoCredito.value ;
        this.caixaF.valorPagamentoCartaoDebito= this.caixa.controls.valorPagamentoCartaoDebito.value ;
        this.caixaF.valorPagamentoConsignado= this.caixa.controls.valorPagamentoConsignado.value ;
        this.caixaF.valorPagamentoDinheiro= this.caixa.controls.valorPagamentoDinheiro.value ;
        this.caixaF.valorPagamentoPix= this.caixa.controls.valorPagamentoPix.value ;
        this.verificaDiferenca();

        //subscribe depois que ele recebe o retorno do back-end ele chama essa arrow function
        this.caixaService.update(this.caixaF).subscribe(() => {
            this.caixaService.findById(this.caixaF.id).subscribe((caixa) => {
                this.caixaF = caixa;

                this.caixa.controls.dataFechamento.setValue(this.caixaF.dataFechamento)
                this.caixa.controls.aberto.setValue(this.caixaF.aberto === true ? 'ABERTO' : 'FECHADO')

                this.caixaService.mostrarMessagem('Caixa fechado com sucesso!', false)
            });

            //this.router.navigate(["/fecha-caixa"]);
        })

    }

    getCaixaFechar() {
        this.caixaService.getCaixaFechar().subscribe(caixa => {
            if (caixa != null) {
                this.caixaF = caixa;
                this.caixa.controls.id.setValue(this.caixaF.id)
                this.caixa.controls.nome.setValue(this.caixaF.nome)
                this.caixa.controls.idUsuario.setValue(this.caixaF.idUsuario)
                this.caixa.controls.valorAbertura.setValue(this.caixaF.valorAbertura)
                this.caixa.controls.valorFechamento.setValue(this.caixaF.valorFechamento)

                this.caixa.controls.valorFechamentoDinheiro.setValue(this.caixaF.valorFechamentoDinheiro)
                this.caixa.controls.valorFechamentoPix.setValue(this.caixaF.valorFechamentoPix)
                this.caixa.controls.valorFechamentoCartaoCredito.setValue(this.caixaF.valorFechamentoCartaoCredito)
                this.caixa.controls.valorFechamentoCartaoDebito.setValue(this.caixaF.valorFechamentoCartaoDebito)
                this.caixa.controls.valorFechamentoConsignado.setValue(this.caixaF.valorFechamentoConsignado)

                this.caixa.controls.diferencaDinheiro.setValue(this.caixaF.diferencaDinheiro)
                this.caixa.controls.diferencaPix.setValue(this.caixaF.diferencaPix)
                this.caixa.controls.diferencaCartaoCredito.setValue(this.caixaF.diferencaCartaoCredito)
                this.caixa.controls.diferencaCartaoDebito.setValue(this.caixaF.diferencaCartaoDebito)
                this.caixa.controls.diferencaConsignado.setValue(this.caixaF.diferencaConsignado)

                this.caixa.controls.valorPagamentoDinheiro.setValue(this.caixaF.valorPagamentoDinheiro)
                this.caixa.controls.valorPagamentoPix.setValue(this.caixaF.valorPagamentoPix)
                this.caixa.controls.valorPagamentoCartaoCredito.setValue(this.caixaF.valorPagamentoCartaoCredito)
                this.caixa.controls.valorPagamentoCartaoDebito.setValue(this.caixaF.valorPagamentoCartaoDebito)
                this.caixa.controls.valorPagamentoConsignado.setValue(this.caixaF.valorPagamentoConsignado)

                this.caixa.controls.dataAbertura.setValue(this.caixaF.dataAbertura)
                this.caixa.controls.dataFechamento.setValue(this.caixaF.dataFechamento)
                this.caixa.controls.aberto.setValue(this.caixaF.aberto === true ?'ABERTO': 'FECHADO')
                this.verificaDiferenca();
            }else{
                this.disable = false;
                this.caixa.controls.aberto.setValue('INDEFINIDO');
            }

        })
    }
    cancelar(): void {
        this.router.navigate(["/"]);
    }

    verificaDiferenca() {
        this.caixa.controls.diferencaDinheiro.setValue(this.caixa.controls.valorPagamentoDinheiro.value - this.caixa.controls.valorFechamentoDinheiro.value);
        this.caixa.controls.diferencaPix.setValue(this.caixa.controls.valorPagamentoPix.value - this.caixa.controls.valorFechamentoPix.value);
        this.caixa.controls.diferencaCartaoCredito.setValue(this.caixa.controls.valorPagamentoCartaoCredito.value - this.caixa.controls.valorFechamentoCartaoCredito.value);
        this.caixa.controls.diferencaCartaoDebito.setValue(this.caixa.controls.valorPagamentoCartaoDebito.value - this.caixa.controls.valorFechamentoCartaoDebito.value);
    
        this.caixaF.diferencaDinheiro =(this.caixa.controls.valorPagamentoDinheiro.value - this.caixa.controls.valorFechamentoDinheiro.value);
        this.caixaF.diferencaPix =(this.caixa.controls.valorPagamentoPix.value - this.caixa.controls.valorFechamentoPix.value);
        this.caixaF.diferencaCartaoCredito =(this.caixa.controls.valorPagamentoCartaoCredito.value - this.caixa.controls.valorFechamentoCartaoCredito.value);
        this.caixaF.diferencaCartaoDebito =(this.caixa.controls.valorPagamentoCartaoDebito.value - this.caixa.controls.valorFechamentoCartaoDebito.value);
    
    }
}
