import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutingModule, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from "@angular/material/toolbar";
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";

import { MatCardModule } from "@angular/material/card";
import { ProdutoComponent } from './views/produto/produto.component';
import { CategoriaComponent } from './views/categoria/categoria.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';

import { MatButtonModule } from "@angular/material/button";
import { CategoriaCreateComponent } from './components/categoria/categoria-create/categoria-create.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { ProdutoRead2Component } from './components/produto/produto-read2/produto-read2.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CategoriaReadComponent } from './components/categoria/categoria-read/categoria-read.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
import { CategoriaUpdateComponent } from './components/categoria/categoria-update/categoria-update.component';
import { VendaCreateComponent } from './components/venda/venda-create/venda-create.component';
import { VendaComponent } from './views/venda/venda.component';
import { VendaReadComponent } from './components/venda/venda-read/venda-read.component';
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckbox, MatCheckboxModule } from "@angular/material/checkbox";
import { DialogComponent } from './components/dialog/dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { VendaUpdateComponent } from "./components/venda/venda-update/venda-update.component";
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { ModoPagamentoComponent } from './views/modo-pagamento/modo-pagamento.component';
import { ModoPagamentoReadComponent } from './components/modo-pagamento/modo-pagamento-read/modo-pagamento-read.component';
import { ModoPagamentoUpdateComponent } from './components/modo-pagamento/modo-pagamento-update/modo-pagamento-update.component';
import { ModoPagamentoCreateComponent } from './components/modo-pagamento/modo-pagamento-create/modo-pagamento-create.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { RelatoriosComponent } from './reports/relatorios/relatorios.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RelatorioVendaComponent } from './views/relatorio-venda/relatorio-venda.component';
import { MatMenuModule } from '@angular/material/menu';
import { AbreCaixaComponent } from './components/caixa/abre-caixa/abre-caixa.component';
import { CriaCaixaComponent } from './views/caixa/cria-caixa/cria-caixa.component';
import { FechaCaixaComponent } from './components/caixa/fecha-caixa/fecha-caixa.component';
import { FechamentoCaixaComponent } from './views/caixa/fechamento-caixa/fechamento-caixa.component';
import { RelatorioCaixaComponent } from './reports/relatorio-caixa/relatorio-caixa.component';
import { ComprovanteVendaComponent } from './components/comprovante-venda/comprovante-venda.component'; //add this line
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { CustomCurrencyMaskConfig } from './utils/CustomCurrencyMaskConfig';
import { PercentageMaskDirective } from './components/modo-pagamento/modo-pagamento-create/percentage-mask.directive';
import { ConsultaCaixaComponent } from './views/caixa/consulta-caixa/consulta-caixa.component';
import { ThermalPrintModule } from 'ng-thermal-print';
import { TestPrintComponent } from './views/caixa/test-print/test-print.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ViewCaixaComponent } from './views/caixa/view-caixa/view-caixa.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helper';
import { LoginComponent } from './login';
import { HomeComponent } from './views/home/home.component';
import { LoadingInterceptor } from './components/loading/loading.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        ProdutoComponent,
        CategoriaComponent,
        ProdutoCreateComponent,
        CategoriaCreateComponent,
        ProdutoReadComponent,
        ProdutoRead2Component,
        CategoriaReadComponent,
        ProdutoUpdateComponent,
        ProdutoDeleteComponent,
        CategoriaUpdateComponent,
        VendaCreateComponent,
        VendaComponent,
        VendaReadComponent,
        VendaUpdateComponent,
        DialogComponent,
        PagamentoComponent,
        ModoPagamentoComponent,
        ModoPagamentoReadComponent,
        ModoPagamentoUpdateComponent,
        ModoPagamentoCreateComponent,
        RelatoriosComponent,
        RelatorioVendaComponent,
        AbreCaixaComponent,
        CriaCaixaComponent,
        FechaCaixaComponent,
        FechamentoCaixaComponent,
        RelatorioCaixaComponent,
        ComprovanteVendaComponent,
        PercentageMaskDirective,
        ConsultaCaixaComponent,
        TestPrintComponent,
        ViewCaixaComponent,
        HomeComponent,
        LoginComponent,
        LoadingComponent,



    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDialogModule,
        NgxMaskModule.forRoot(maskConfig),
        BrowserModule,
        PdfViewerModule,
        MatMenuModule,
        CurrencyMaskModule,
        NgxMaskModule.forRoot(),
        ThermalPrintModule,
        appRoutingModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

    ],
    exports: [
        PercentageMaskDirective
    ],
    providers: [
     
        { provide: CURRENCY_MASK_CONFIG,
            useValue: CustomCurrencyMaskConfig 
        },
        { provide: MAT_DATE_LOCALE,
          useValue: "en-IN" 
        },
      
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,
          multi: true },
        { provide: HTTP_INTERCEPTORS, 
          useClass: ErrorInterceptor, multi: true },
          fakeBackendProvider,
    ],

    bootstrap: [AppComponent]
})

export class AppModule {
}
