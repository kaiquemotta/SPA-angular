import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CaixaModel } from 'src/app/components/caixa/caixa.model';
import { CaixaService } from 'src/app/components/caixa/caixa.service';
import { PagamentoComponent } from 'src/app/components/pagamento/pagamento.component';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { ViewCaixaComponent } from '../view-caixa/view-caixa.component';

@Component({
  selector: 'app-consulta-caixa',
  templateUrl: './consulta-caixa.component.html',
  styleUrls: ['./consulta-caixa.component.css']
})
export class ConsultaCaixaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CaixaModel>;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'caixad', 'usuario', 'valorAbertura', 'valorFechamento', 'dataAbertura', 'dataFechamento', 'acoes'];
  EXAMPLE_DATA: CaixaModel[]
  dataSource = new MatTableDataSource<CaixaModel>(this.EXAMPLE_DATA);

  constructor(private caixaService: CaixaService,public dialog: MatDialog,
    headerService: HeaderService) {
    headerService.headerData = {
      titulo: 'Lista Caixas',
      icone: 'assignment_turned_in',
      routeUrl: '/'
    }
  }

  ngOnInit() {
    this.findAll()
  }

  public findAll() {
    this.caixaService.findAll().subscribe(caixas => this.dataSource.data = caixas as CaixaModel[])
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  viewCaixa(idd) {

    let dialogRef = this.dialog.open(ViewCaixaComponent, {
        width: '1200x',
        height: '650px',
        data: {id: idd}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result == "SIM") {

        }
    });
}
}
