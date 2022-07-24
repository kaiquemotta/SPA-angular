import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CaixaModel } from 'src/app/components/caixa/caixa.model';
import { CaixaService } from 'src/app/components/caixa/caixa.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

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

  constructor(private caixaService: CaixaService,
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
}
