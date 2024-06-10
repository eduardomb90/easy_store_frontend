import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { Pedido } from 'src/app/model/Pedido';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizarpedido',
  templateUrl: './finalizarpedido.component.html',
  styleUrls: ['./finalizarpedido.component.css']
})
export class FinalizarpedidoComponent implements OnInit {
  public clienteForm: FormGroup;
  public pedido: Pedido = new Pedido();
  public observacoes: string = "";
  public existe: boolean = false;
  public visivel: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private nav: Router,
  ) {
    this.clienteForm = this.fb.group({
      idCliente: [''],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      nome: [''],
      email: [''],
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });


  }

  ngOnInit(): void {}

  get telefone() {
    return this.clienteForm.get('telefone');
  }

  public buscarTelefone() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const telefone = this.clienteForm.value.telefone;
    this.clienteService.buscarClientePeloTelefone(telefone).subscribe({
      next: (cliente: Cliente) => {
        this.clienteForm.patchValue(cliente);
        this.existe = true;
        this.visivel = true;
        console.log(cliente);
      },
      error: (error) => {
        if (error.status === 404) {
          // A pesquisa não encontrou o cliente com esse telefone.
          this.visivel = true;
          console.log(error);
        } else {
          alert("Erro desconhecido " + error);
        }
      },
      complete: () => {
        console.log("Busca por cliente finalizada!");
      }
    });
  }

  public confirmarPedido(){
    this.carrinhoService.carrinho$.subscribe({
      next: (data: Pedido) => {
        this.pedido = data;
      }
    });

    this.pedido.cliente = {
      idCliente: this.clienteForm.value.idCliente,
      nome: this.clienteForm.value.nome,
      email: this.clienteForm.value.email,
      telefone: this.clienteForm.value.telefone,
      cep: this.clienteForm.value.cep,
      logradouro: this.clienteForm.value.logradouro,
      numero: this.clienteForm.value.numero,
      complemento: this.clienteForm.value.complemento,
      bairro: this.clienteForm.value.bairro,
      cidade: this.clienteForm.value.cidade,
      estado: this.clienteForm.value.estado,
    };

    this.pedido.status = 0; // pedido inical.
    this.pedido.observacoes = this.observacoes;



    this.pedidoService.inserirNovoPedido(this.pedido).subscribe({
      next: (novoPedido: Pedido) => {
        console.log('PEDIDO REGISTRADO:', novoPedido);
        console.log(`NÚMERO DO PEDIDO: ${novoPedido.idPedido}`);
        this.carrinhoService.limparCarrinho();
        this.nav.navigate([`recibo/${novoPedido.idPedido}`]);
      },
      error: (err) => {
        console.log(`OCORREU UM ERRO: ${err}`);
        alert("Não foi possível registrar seu pedido.");
      },
      complete: () => {
        console.log("Processamento finalizado.");
      }

    })
  }
}
