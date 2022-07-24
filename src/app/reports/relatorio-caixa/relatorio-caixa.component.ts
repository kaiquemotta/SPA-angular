import {Component, OnInit} from '@angular/core';
import {VendaService} from "../../components/venda/venda.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-relatorio-caixa',
    templateUrl: './relatorio-caixa.component.html',
    styleUrls: ['./relatorio-caixa.component.css']
})
export class RelatorioCaixaComponent  implements OnInit{


    pdfSrc = "http://localhost:8080/caixa/caixa/export/pdf/";
    id: number;
    private sub: any;


    constructor(private vendaService: VendaService,
        private route: ActivatedRoute,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            this.pdfSrc +=this.id;
        })

    }
}
