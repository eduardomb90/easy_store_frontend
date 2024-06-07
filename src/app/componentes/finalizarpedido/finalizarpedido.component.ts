import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-finalizarpedido',
  templateUrl: './finalizarpedido.component.html',
  styleUrls: ['./finalizarpedido.component.css']
})
export class FinalizarpedidoComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public existe: boolean = false;
  public visivel: boolean = false;

  constructor(private service: ClienteService){}

  ngOnInit(): void {

  }

  public buscarTelefone(){
    this.service.buscarClientePeloTelefone(this.cliente.telefone).subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.existe = true;
        console.log(this.cliente);
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log("Busca por cliente finalizada! ")
      }
    })
  }
}
