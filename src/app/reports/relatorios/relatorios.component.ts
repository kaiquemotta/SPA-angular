import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../components/categoria/categoria.service";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { VendaService } from "../../components/venda/venda.service";
import { AuthenticationService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],

})
export class RelatoriosComponent implements OnInit {

  src: any;

  constructor(private vendaService: VendaService,
    private router: Router,
    private fb: FormBuilder, private authenticationService: AuthenticationService,) {
  }
  ngOnInit(): void {

    let currentUser = this.authenticationService.currentUserValue;

    let url = `${environment.apiUrl}/venda/vendas/export/pdf/`;

    this.src = {
      url: url,
      httpHeaders: { Authorization: `Bearer ${currentUser.jwt}` },
    };
  }
}
