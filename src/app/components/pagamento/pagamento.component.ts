import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ModoPagamentoService } from "../modo-pagamento/modo-pagamento.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { VendaModel } from "../venda/venda.model";
import { VendaService } from "../venda/venda.service";
import { PagamentoModel } from "./pagamento.model";
import { PagamentoService } from "./pagamento.service";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingService } from '../loading/loading.service';


@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {


    displayedColumns: string[] = ['modoPagamento', 'quantidadeParcela', 'valorPagamento'];
    dataSource: MatTableDataSource<PagamentoModel>;
    modosPagamentos: any
    pagamento: FormGroup;
    pagamentos: PagamentoModel[] = [];
    modoPagamento: any;
    restante: number;
    troco: number;
    btn: boolean = true;
    isloading: boolean = false;

    venda: VendaModel = {
        id: 0,
        nomeComanda: '',
        finalizada: false,
        subTotal: '',
        valorTotal: 0,
        dataCriacaoVenda: '',
        dataFechamentoVenda: '',
        porcentagemDesconto: 0
    }

    pagamentoModel: PagamentoModel = {
        id: 0,
        idModoPagamento: '',
        porcentagemDesconto: 0,
        valorPagamento: 0,
        idVenda: this.data.id,
        quantidadeParcela: 0,
        dataPagamento: '',
        troco: 0
    }

    constructor(
        public dialogRef: MatDialogRef<PagamentoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private modoPagamentoService: ModoPagamentoService, private vendaService: VendaService, private pagamentoService: PagamentoService, private fb: FormBuilder, private router: Router,
        public loadingService: LoadingService, private cdr: ChangeDetectorRef) {
        this.dataSource = new MatTableDataSource(this.pagamentos);

   

    }

    ngOnInit(): void {
/*
        this.loadingService.loading$.subscribe((val) => {
            this.isloading = val;
            this.cdr.detectChanges();
        });*/
        this.pagamento = this.fb.group({
            id: [{ value: '', disabled: true }],
            modoPagamento: [{ value: '', disabled: false, }],
            total: [{ value: this.venda.valorTotal, disabled: true }],
            restante: [{ value: 0.00, disabled: true }],
            subTotal: [{ value: this.venda.subTotal, disabled: true }],
            porcentagemDesconto: [{ value: '', disabled: true }],
            valorPagamento: [{ value: '', disabled: true }, Validators.required],
            idVenda: [{ value: this.data.id, disabled: false }],
            quantidadeParcela: [{ value: '', disabled: true }, Validators.required],
            troco: [{ value: '', disabled: true }],

        })

        this.vendaFindById();


    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    get c() {
        return this.pagamento.controls
    }

    private findAllModosPagamentos() {
        this.modoPagamentoService.findAll().subscribe(modoPagamento => {
            this.modosPagamentos = modoPagamento
        })
    }

    private vendaFindById() {
        this.vendaService.findById(this.data.id).subscribe(venda => {
            this.venda = venda;
            this.findAllPagamentos();
            this.findAllModosPagamentos();
        })
    }

    addPagamento() {
        if (this.pagamento.invalid || this.pagamento.controls.valorPagamento.value == 0
            || (this.pagamento.controls.valorPagamento.value > this.restante && this.modoPagamento.id !== 1)
        ) {
            this.modoPagamentoService.mostrarMessagem("Erro", true)
            this.pagamento.controls.valorPagamento.setValue(0)
            return;
        } else if (this.modoPagamento.id !== 1) {
            this.pagamentoService.insert(this.pagamento.value).subscribe(pagamento => {
                this.pagamentoModel = pagamento
                this.pagamentos.push({ ...this.pagamentoModel })
                this.dataSource = new MatTableDataSource(this.pagamentos);
                this.calculaRestante();
                this.trataBotao();

            })
        } else if (this.modoPagamento.id === 1) {
            this.verificaTroco();
            this.pagamentoService.insert(this.pagamento.value).subscribe(pagamento => {
                this.pagamentoModel = pagamento
                this.pagamentos.push({ ...this.pagamentoModel })
                this.dataSource = new MatTableDataSource(this.pagamentos);
                this.calculaRestante();
                this.trataBotao();
            })
        }
    }

    findAllPagamentos() {
        this.pagamentoService.findByVendaId(this.data.id).subscribe(pagamentos => {
            this.pagamentos = pagamentos
            this.dataSource = new MatTableDataSource(this.pagamentos);
            this.somaRestante();
            this.trataBotao();
        })
    }

    selectModoPgto(modoPagamento: any) {
        this.modoPagamento = modoPagamento;
        this.pagamento.controls.porcentagemDesconto.enable();
        this.pagamento.controls.valorPagamento.enable();
        this.pagamento.controls.quantidadeParcela.enable();
        this.pagamento.controls.quantidadeParcela.setValue('1');
        this.pagamento.controls.troco.setValue(0);
        this.pagamento.controls.valorPagamento.setValue(0)
    }

    recalculaTotal() {
        var porcentagem = this.pagamento.controls.porcentagemDesconto.value / 100;
        var sub = this.venda.valorTotal;
        var valorDesconto = porcentagem * sub;
        if (valorDesconto >= 0 && porcentagem <= this.modoPagamento.porcentagemDesconto / 100) {
            this.pagamento.controls.total.setValue(this.venda.valorTotal - valorDesconto);
        } else {
            this.modoPagamentoService.mostrarMessagem("Porcentagem não permitida", true)
            this.pagamento.controls.porcentagemDesconto.setValue(0);
        }
    }
    private calculaRestante() {
        if (this.pagamento.controls.valorPagamento.value <= this.restante) {
            this.restante -= this.pagamento.controls.valorPagamento.value;
        } else if (this.pagamento.controls.valorPagamento.value >= this.restante && this.modoPagamento.id === 1) {
            this.restante = 0;
            this.trataBotao();
        }
    }
    trataBotao() {
        console.log(this.venda);
        if (this.restante === 0 && this.venda.finalizada === false) {

            this.btn = false;
        }

    }

    finalizaVenda() {
        if (this.restante == 0) {
            this.vendaService.finalizaVenda(this.data.id).subscribe(venda => {
                this.vendaService.mostrarMessagem('Venda criada com sucesso!', false)
                this.dialogRef.close();
                this.router.navigate(["venda"]);
            })
        }
        else {
            this.vendaService.mostrarMessagem('Erro, pagamento não recebido', true)
        }
    }

    somaRestante() {
        var soma = 0;
        for (let pagamento of this.pagamentos) {
            soma += pagamento.valorPagamento;
        }
        this.restante = this.venda.valorTotal - soma < 0 ? 0 : this.venda.valorTotal - soma;

    }


    somaTroco() {
        this.pagamento.controls.troco.setValue(this.pagamento.controls.valorPagamento.value - this.restante);
        this.troco = this.pagamento.controls.valorPagamento.value - this.restante;
    }

    verificaTroco() {
        if (this.modoPagamento.id === 1 && this.pagamento.controls.valorPagamento.value > this.restante && this.restante != 0) {
            this.pagamento.controls.troco.setValue(this.pagamento.controls.valorPagamento.value - this.restante);
            this.pagamento.value.troco = this.pagamento.controls.valorPagamento.value - this.restante;

            // this.pagamento.controls.valorPagamento.setValue(0.00)
        }
    }


    onSubmit()
        :
        void {
        // Process checkout data here
        // this.items = this.cartService.clearCart();
        // console.warn('Your order has been submitted', this.checkoutForm.value);
        // this.checkoutForm.reset();
    }


}
