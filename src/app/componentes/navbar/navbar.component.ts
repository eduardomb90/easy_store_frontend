import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { BuscarprodutobykeyService } from 'src/app/services/buscarprodutobykey.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public categorias: Categoria[] = [];
  public erroMensagem: string | null = null;
  public quantidadeItensCarrinho: number = 0;
  public keyword!: string;

  constructor(
    private categoriaService: CategoriaService,
    private carrinhoService: CarrinhoService,
    private route: Router,
    private buscaService: BuscarprodutobykeyService
  ){}

  ngOnInit(): void {
    this.categoriaService.getAllCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
      },
      error: (error: any) => {
        this.erroMensagem = 'Ocorreu um erro ao carregar os categorias. Por favor, tente novamente mais tarde.';
        console.error('Erro ao carregar categorias:', error);
      },
      complete: () => {
        console.log('Requisição de produtos completa.');
      }
    });

    this.carrinhoService.carrinho$.subscribe(pedido => {
      this.quantidadeItensCarrinho = pedido.itensPedido.length;
    });
  }

  public buscarProduto(){
    if(this.keyword) {
      this.route.navigate([`/busca`]);
      this.buscaService.setKeyword(this.keyword);
    }
  }
}
