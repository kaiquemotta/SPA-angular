import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { ProdutoService } from "../../produto/produto.service";
import { ProdutoModel } from "../../produto/produto.model";
import { ItemVendaModel } from "../itemVenda.model";
import { DialogComponent } from "../../dialog/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { VendaService } from "../venda.service";
import { ItemVendaService } from "../itemVenda.service";
import { ActivatedRoute } from "@angular/router";
import { PagamentoComponent } from "../../pagamento/pagamento.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
    selector: 'app-venda-update',
    templateUrl: './venda-update.component.html',
    styleUrls: ['./venda-update.component.css'],
})
export class VendaUpdateComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ProdutoModel>;


    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'nome', 'preco', 'categoria', 'select'];
    EXAMPLE_DATA: ProdutoModel[]
    dataSource = new MatTableDataSource<ProdutoModel>();


    id: number;
    total: number = 0;
    private sub: any;
    myControl = new FormControl();
    filteredOptions: Observable<ProdutoModel[]>;
    produtos: ProdutoModel[] = new Array<ProdutoModel>();
    itensVenda: ItemVendaModel[] = [];
    selection = new SelectionModel<ProdutoModel>(true, []);


    userControl = new FormControl();
    name: string;


    itemVenda: ItemVendaModel = {
        id: 0,
        quantidade: 1,
        subTotal: 0,
        produtoNome: '',
        produtoPreco: 0,
        idProduto: 0,
        idVenda: 0,
    }


    constructor(private route: ActivatedRoute, private itemVendaService: ItemVendaService, private vendaService: VendaService, private produtoService: ProdutoService, public dialog: MatDialog) {

    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

    }

    ngAfterViewInit() {

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;


    }


    ngOnInit() {
        this.initProd();

    }
    initProd() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        this.carregaItensVenda();
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.nome),
                map(nome => nome ? this._filter(nome) : this.produtos)
            );
        this.findAllProdutos();
        this.total = this.atualizaTotal();
    }




    achaItenVendaSelect(nome: string): ItemVendaModel {
        for (let item of this.itensVenda) {
            if (item.produtoNome === nome) {
                return item;
            }
        }
    }

    displayFn(product: ProdutoModel): string {
        return product && product.nome ? product
            .nome : '';
    }


    optionClicked(event: Event, user: ProdutoModel) {
        user.selected = user.selected === false || user.selected === undefined ? true : false;
        this.toggleSelection(user);

    }

    removerItemVenda(itemVenda: ItemVendaModel) {
        const i = this.itensVenda.findIndex(value => value.idProduto === itemVenda.idProduto);
        this.itensVenda.splice(i, 1,)
        const produto = this.produtos.findIndex(value => value.id === itemVenda.idProduto);
        this.produtos[produto].selected = false;
        this.checkboxLabel(this.produtos[produto])
        this.atualizaTotal();

    }

    toggleSelectionItemVenda(itemVenda: ItemVendaModel) {
        if (itemVenda.quantidade > 0) {
            itemVenda.subTotal = itemVenda.quantidade * itemVenda.produtoPreco;

        } else {
            itemVenda.subTotal = itemVenda.quantidade * itemVenda.produtoPreco;
        }
        this.atualizaTotal();
        this.userControl.setValue(this.itensVenda);
    }

    atualizaTotal(): number {
        this.total = 0;
        this.itensVenda.forEach(item => {
            this.total += item.subTotal;
        })
        return;
    }

    private _filter(nome: string): ProdutoModel[] {
        const filterValue = nome.toLowerCase();
        return this.produtos.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
    }

    private findAllProdutos(): ProdutoModel[] {
        this.produtoService.findAll().subscribe(produtos => {
            produtos.map(prod => this.produtos.push(prod))
            for (let item of this.itensVenda) {
                for (let produto of this.produtos) {
                    if (item.idProduto === produto.id) {
                        produto.selected = true;
                    } 
                }
            }
            if (this.itensVenda.length === 0) {
                this.produtos.forEach(a => {
                    a.selected = false;
                })
            }
            this.dataSource.data = produtos

        })
        return this.produtos;
    }

    private carregaItensVenda(): ItemVendaModel[] {
        this.itemVendaService.findByVendaId(this.id).subscribe(itens => {
            itens.map(item => this.itensVenda.push({ ...item }))
            this.atualizaTotal();
        });
        return this.itensVenda;
    }

    deleteItemVenda(itemVenda: ItemVendaModel): void {
        if (itemVenda.id != 0) {
            this.itemVendaService.delete(itemVenda.id, itemVenda.idVenda).subscribe(() => {
                this.removerItemVenda(itemVenda);
            })
        } else {
            this.removerItemVenda(itemVenda);
        }


        // let dialogRef = this.dialog.open(DialogComponent, {
        //     width: '250px',
        // });

        // dialogRef.afterClosed().subscribe(result => {

        // });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    salvarItensVenda() {
        this.itemVendaService.insertItensVenda(this.itensVenda).subscribe(itens => {
            this.itensVenda = null;
            this.itensVenda = itens;
            this.produtoService.mostrarMessagem('Comanda atualizada!', false);
        })
    }


    realizarPagamento() {

        let dialogRef = this.dialog.open(PagamentoComponent, {
            width: '550px',
            height: '650px',
            data: { id: this.id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == "SIM") {

            }
        });
    }


    toggleSelection(produto: ProdutoModel) {

        if (produto.selected === true) {
            this.itemVenda.idProduto = produto.id;
            this.itemVenda.produtoNome = produto.nome;
            this.itemVenda.produtoPreco = produto.preco;
            this.itemVenda.quantidade = 1;
            this.itemVenda.subTotal = produto.preco * 1;
            this.itemVenda.idVenda = this.id;
            this.itensVenda.push({ ...this.itemVenda })
            this.userControl.setValue(this.itensVenda);
            this.atualizaTotal();
            const posProd = this.produtos.findIndex(value => value.id === this.itemVenda.idProduto);
            this.produtos[posProd].selected = true;
        } else {
            const i = this.itensVenda.findIndex(value => value.idProduto === produto.id);
            this.itemVenda = this.itensVenda[i];
            this.deleteItemVenda(this.itemVenda);
        }
    }


    isAllSelected() {
        const numSelected = this.selection.selected.length;

        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ProdutoModel): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
}

