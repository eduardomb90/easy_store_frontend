import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { CepService } from 'src/app/services/cep.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Cliente } from 'src/app/model/Cliente';
import { Pedido } from 'src/app/model/Pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizarpedido',
  templateUrl: './finalizarpedido.component.html',
  styleUrls: ['./finalizarpedido.component.css']
})
export class FinalizarpedidoComponent implements OnInit {
  public cpfForm: FormGroup;
  public clienteForm: FormGroup;
  public pedido: Pedido = new Pedido();
  public observacoes: string = "";
  public existe: boolean = false;
  public visivel: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private cepService: CepService,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private nav: Router,
  ) {
    this.cpfForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{14,15}$/)]]
    });

    this.clienteForm = this.fb.group({
      idCliente: [''],
      telefone: [''],
      cpf: [''],
      nome: [''],
      email: [''],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Validação para 8 dígitos
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });
  }


  ngOnInit(): void {}

  get cpf() {
    return this.clienteForm.get('cpf');
  }

  public buscarTelefone() {
    if (this.cpfForm.invalid) {
      this.cpfForm.markAllAsTouched();
      return;
    }

    const telefone = this.cpfForm.value.telefone;
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

  public buscarCpf() {
    if (this.cpfForm.invalid) {
      this.cpfForm.markAllAsTouched();
      return;
    }

    const cpf = this.cpfForm.value.cpf;
    this.clienteService.buscarClientePeloCpf(cpf).subscribe({
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

  public buscarCep() {
    const cep = this.clienteForm.value.cep;

    if (cep && /^\d{8}$/.test(cep)) { // Validação para 8 dígitos
      this.cepService.buscarCep(cep).subscribe({
        next: (data) => {
          if (data.erro) {
            alert("CEP não encontrado.");
            return;
          }

          this.clienteForm.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            complemento: data.complemento,
          });

          console.log(data);
        },
        error: (error) => {
          console.log("Erro ao buscar CEP:", error);
          alert("Não foi possível buscar o CEP.");
        },
        complete: () => {
          console.log("Busca por CEP finalizada.");
        }
      });
    } else {
      alert("Por favor, insira um CEP válido.");
    }
  }

  public confirmarPedido(){
    this.carrinhoService.atualizarPrecos().then((pedidoAtualizado: Pedido) => {
      this.pedido = pedidoAtualizado;

      this.pedido.cliente = {
        idCliente: this.clienteForm.value.idCliente,
        nome: this.clienteForm.value.nome,
        email: this.clienteForm.value.email,
        telefone: this.clienteForm.value.telefone,
        cpf: this.clienteForm.value.cpf,
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
      });
    }).catch(err => {
      console.log(`Erro ao atualizar preços: ${err}`);
      alert("Não foi possível atualizar os preços. Tente novamente.");
    });
  }
}
