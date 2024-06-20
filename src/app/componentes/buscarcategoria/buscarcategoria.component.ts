import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-buscarcategoria',
  templateUrl: './buscarcategoria.component.html',
  styleUrls: ['./buscarcategoria.component.css']
})
export class BuscarcategoriaComponent implements OnInit {

  public produtos: Produto[] = [];
  public idCategoria!: number;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {
    this.route.params.subscribe({
      next: (params) => {
        this.idCategoria = params['id'];
        this.buscarPorCategoria();
      }
    })
  }

  ngOnInit(): void {
  }

  public buscarPorCategoria() {
    this.produtoService.getProdutosPelaCategoria(this.idCategoria).subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
      },
      error: (err) => {
        console.log("Erro ao tentar recuperar produtos por categoria.")
        console.log(err);
      }
    });
  }
}
