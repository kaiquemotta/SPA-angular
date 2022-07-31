import { Component, OnInit } from '@angular/core';
import { VendaService } from "../../components/venda/venda.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services';

@Component({
    selector: 'app-relatorio-caixa',
    templateUrl: './relatorio-caixa.component.html',
    styleUrls: ['./relatorio-caixa.component.css']
})
export class RelatorioCaixaComponent implements OnInit {


    pdfSrc = `${environment.apiUrl}/caixa/caixa/export/pdf/"`

    id: number;
    private sub: any;

    src: any;

    constructor(private vendaService: VendaService, private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private fb: FormBuilder) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            this.pdfSrc += this.id;
        })

        let currentUser = this.authenticationService.currentUserValue;
        
        let url = `${environment.apiUrl}/caixa/caixa/download/pdf/` + this.id;

        this.src = {
            url: url,
            httpHeaders: { Authorization: `Bearer ${currentUser.jwt}` },
        };
    }


}
