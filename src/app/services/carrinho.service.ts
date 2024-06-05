import { Injectable } from '@angular/core';
import { Pedido } from '../model/Pedido';
import { BehaviorSubject } from 'rxjs';
import { ItemPedido } from '../model/ItemPedido';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private pedido: Pedido = new Pedido();
  private carrinhoSubject = new BehaviorSubject<Pedido>(this.pedido);

  carrinho$ = this.carrinhoSubject.asObservable();

  constructor() {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    const carrinho = localStorage.getItem('easyStoreCarrinho');
    if (carrinho) {
      this.pedido = JSON.parse(carrinho) as Pedido;
      this.carrinhoSubject.next(this.pedido);
    }
  }

  adicionarItem(item: ItemPedido): void {
    this.pedido.itensPedido.push(item);
    this.atualizarCarrinho();
  }

  public excluirItem(index: number): void {
    if (this.pedido) {
      this.pedido.itensPedido.splice(index, 1);
      this.atualizarCarrinho();
    }
  }

  atualizarCarrinho(): void {
    this.pedido.valorTotal = this.pedido.itensPedido.reduce((total, item) => total + item.precoTotal, 0);
    localStorage.setItem('easyStoreCarrinho', JSON.stringify(this.pedido));
    this.carrinhoSubject.next(this.pedido);
  }

  limparCarrinho(): void {
    this.pedido = new Pedido();
    localStorage.removeItem('easyStoreCarrinho');
    this.carrinhoSubject.next(this.pedido);
  }

  obterQuantidadeItens(): number {
    return this.pedido.itensPedido.length;
  }
}
