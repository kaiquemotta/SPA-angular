import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CaixaModel } from 'src/app/components/caixa/caixa.model';
import { CaixaService } from 'src/app/components/caixa/caixa.service';
import { ModoPagamentoService } from 'src/app/components/modo-pagamento/modo-pagamento.service';
import { PagamentoModel } from 'src/app/components/pagamento/pagamento.model';
import { PagamentoService } from 'src/app/components/pagamento/pagamento.service';
import { VendaService } from 'src/app/components/venda/venda.service';

@Component({
  selector: 'app-view-caixa',
  templateUrl: './view-caixa.component.html',
  styleUrls: ['./view-caixa.component.css']
})
export class ViewCaixaComponent implements OnInit {

  displayedColumns: string[] = ['idVenda','modoPagamento', 'quantidadeParcela', 'valorPagamento'];
  dataSource: MatTableDataSource<PagamentoModel>;
  modosPagamentos: any
  pagamento: FormGroup;
  pagamentos: PagamentoModel[] = [];
  caixa : CaixaModel;
  modoPagamento: any;
  restante: number;
  troco: number;
  btn: boolean = true;
  id: number;
  total: number = 0;
  carregado = false;
  private sub: any;
  status :string;

  constructor(private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ViewCaixaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private modoPagamentoService: ModoPagamentoService,
    private vendaService: VendaService, private caixaService: CaixaService, private pagamentoService: PagamentoService, private fb: FormBuilder, private router: Router,) {
    this.dataSource = new MatTableDataSource(this.pagamentos);

  }
  ngOnInit(): void {
    this.pagamento = this.fb.group({
      id: [{ value: '', disabled: true }],
      dataFechamento: [{ value: '', disabled: true }],
      dataAbertura: [{ value: '', disabled: true }],
      valorAbertura: [{ value: '', disabled: true }],
      valorFechamento: [{ value: '', disabled: true }],

      valorPagamentoDinheiro: [{ value: '', disabled: true }],
      valorPagamentoPix: [{ value: '', disabled: true }],
      valorPagamentoCartaoCredito: [{ value: '', disabled: true }],
      valorPagamentoCartaoDebito: [{ value: '', disabled: true }],
      valorPagamentoConsignado: [{ value: '', disabled: true }],


      diferencaDinheiro: [{ value: '', disabled: true }],
      diferencaPix: [{ value: '', disabled: true }],
      diferencaCartaoCredito: [{ value: '', disabled: true }],
      diferencaCartaoDebito: [{ value: '', disabled: true }],
      diferencaConsignado: [{ value: '', disabled: true }],



      
      valorFechamentoDinheiro: [{ value: '', disabled: true }],
      valorFechamentoPix: [{ value: '', disabled: true }],
      valorFechamentoCartaoCredito: [{ value: '', disabled: true }],
      valorFechamentoCartaoDebito: [{ value: '', disabled: true }],
      valorFechamentoConsignado: [{ value: '', disabled: true }],

      status: [{ value: '', disabled: true }],


    })
    console.log(this.data.id);
    this.findById();
  }

  private findById() {
    this.caixaService.findByUsuario(this.data.id).subscribe(caixa => {
      this.caixa = caixa;
      this.pagamentos = caixa.pagamentos;
      this.dataSource = new MatTableDataSource(this.pagamentos);
      this.carregado= true;
      this.status = caixa.aberto === true ? 'Aberto': 'Fechado';
    })
  }
}
