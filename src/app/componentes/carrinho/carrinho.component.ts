import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/model/Pedido';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  public pedido: Pedido | null = null;

  constructor(
    private carrinhoService: CarrinhoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(pedido => {
      this.pedido = pedido;
    });
  }

  public excluirItem(index: number): void {
    if (this.pedido) {
      this.carrinhoService.excluirItem(index);
    }
  }

  public limparCarrinho(): void {
    this.carrinhoService.limparCarrinho();

  }

  atualizarQuantidade(index: number, quantidade: number): void {
    if (this.pedido && quantidade > 0) {
      const item = this.pedido.itensPedido[index];
      item.qtdeItem = quantidade;
      item.precoTotal = quantidade * item.precoUnitario;
      this.carrinhoService.atualizarCarrinho();
    }
  }

  public finalizarCompra(){
    if(this.pedido != null && this.pedido?.itensPedido.length > 0) {
      this.route.navigate(['/finalizarcompra']);
    } else {
      this.route.navigate(['/destaques']);
    }

  }
}
