import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from '../../services/produto.service';
import { Pedido } from 'src/app/model/Pedido';
import { ItemPedido } from 'src/app/model/ItemPedido';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit{
  public produto: Produto | undefined;
  public quantidade: number = 1;

  constructor(
    private route: ActivatedRoute,
    private service: ProdutoService,
    private nav: Router
  ){}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getProduto(id).subscribe({
      next: (data: Produto) => {
        this.produto = data;
      },
      error: () => {
        console.log('Não foi possível carregar os detalhes do produto');
      },
      complete: () => {
        console.log("Processamento finalizado.");
      }
    });
  }

  public adicionarAoCarrinho(){
    const carrinho = localStorage.getItem("easyStoreCarrinho");
    let pedido: Pedido;

    if(carrinho) {
      pedido = JSON.parse(carrinho) as Pedido;
    } else {
      pedido = new Pedido();
    }

    if(this.produto) {
      const itemPedido: ItemPedido = new ItemPedido();
      itemPedido.qtdeItem = this.quantidade;
      itemPedido.produto = this.produto;
      itemPedido.precoUnitario = this.produto.preco;
      itemPedido.precoTotal = itemPedido.precoUnitario * itemPedido.qtdeItem;

      pedido.itensPedido.push(itemPedido);
      //pedido.valorTotal += itemPedido.precoTotal;
      pedido.valorTotal = pedido.itensPedido.reduce((total, item) => total + item.precoTotal, 0);

      localStorage.setItem('easyStoreCarrinho', JSON.stringify(pedido));
      console.log('Produto adicionado ao carrinho:', itemPedido);
    }

    this.nav.navigate(['carrinho']);
  }
}
