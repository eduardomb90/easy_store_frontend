import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/Pedido';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  public pedido: Pedido | null = null;

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  public carregarCarrinho(): void {
    const carrinho = localStorage.getItem('easyStoreCarrinho');
    if (carrinho) {
      this.pedido = JSON.parse(carrinho) as Pedido;
    }
  }

  public excluirItem(index: number): void {
    if (this.pedido) {
      this.pedido.itensPedido.splice(index, 1);
      this.recalcularValorTotal();
      localStorage.setItem('easyStoreCarrinho', JSON.stringify(this.pedido));
    }
  }

  public limparCarrinho(): void {
    this.pedido = null;
    localStorage.removeItem('easyStoreCarrinho');
  }

  private recalcularValorTotal(): void {
    if (this.pedido) {
      this.pedido.valorTotal = this.pedido.itensPedido.reduce((total, item) => total + item.precoTotal, 0);
    }
  }
}
