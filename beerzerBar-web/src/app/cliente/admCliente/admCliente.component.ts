
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ClienteService } from './../../cliente.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';




@Component({
  selector: 'app-admCliente',
  templateUrl: './admCliente.component.html',
  styleUrls: ['./admCliente.component.css']
})
export class AdmClienteComponent implements OnInit {

  clientes$!: Observable<Cliente[]>;
  cliente!: Cliente;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private service: ClienteService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    }

    this.route.params.subscribe(clientes=> {
      this.clientes$ = this.service.showClitent()
      this.dtTrigger.next();
    });
  }

  OnRoute()
  {

  }


  OnDelete(cliente: Cliente)
  {
    this.service.deleteClient(cliente).subscribe(
          (sucess) => {
            alert("Excluido com sucesso!!");
            window.location.reload();
          },
          (error) => {
            alert("Erro ao Excluir!!");
          }
        );
  }
}


