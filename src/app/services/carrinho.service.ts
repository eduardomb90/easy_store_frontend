import { Injectable } from '@angular/core';
import { Pedido } from '../model/Pedido';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ItemPedido } from '../model/ItemPedido';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private pedido: Pedido = new Pedido();
  private carrinhoSubject = new BehaviorSubject<Pedido>(this.pedido);

  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private produtoService: ProdutoService) {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    const carrinho = localStorage.getItem('easyStoreCarrinho');
    if (carrinho) {
      const parsedCarrinho = JSON.parse(carrinho) as Pedido;
      const expiracao = parsedCarrinho.timestamp;

      if (Date.now() > expiracao) {
        this.limparCarrinho();
      } else {
        this.pedido = parsedCarrinho;
        this.carrinhoSubject.next(this.pedido);
      }
    }
  }

  private getProximaMeiaNoite(): number {
    const agora = new Date();
    const proximaMeiaNoite = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1);
    return proximaMeiaNoite.getTime();
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
    this.pedido.timestamp = this.getProximaMeiaNoite(); // Define a expiração para a próxima meia-noite
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

  async atualizarPrecos(): Promise<Pedido> {
    const atualizacoes = this.pedido.itensPedido.map(async item => {
      const produtoAtualizado = await lastValueFrom(this.produtoService.getProduto(item.produto.id));
      if (produtoAtualizado) {
        item.produto.preco = produtoAtualizado.preco;
        item.precoUnitario = produtoAtualizado.preco;
        item.precoTotal = produtoAtualizado.preco * item.qtdeItem;
      }
      return item;
    });

    await Promise.all(atualizacoes);
    this.pedido.valorTotal = this.pedido.itensPedido.reduce((total, item) => total + item.precoTotal, 0);
    this.atualizarCarrinho();
    return this.pedido;
  }
}
