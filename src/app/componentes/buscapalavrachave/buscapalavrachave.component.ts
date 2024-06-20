import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { BuscarprodutobykeyService } from 'src/app/services/buscarprodutobykey.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-buscapalavrachave',
  templateUrl: './buscapalavrachave.component.html',
  styleUrls: ['./buscapalavrachave.component.css']
})
export class BuscapalavrachaveComponent implements OnInit {
  public produtos: Produto[] = [];
  public keyword!: string;


  constructor(
    private buscaService: BuscarprodutobykeyService,
    private produtoService: ProdutoService
   ) {
    buscaService.getKeyword().subscribe((data: string) => {
      this.keyword = data;
      this.produtoService.getProdutosPelaPalavraChave(this.keyword).subscribe({
        next: (data: Produto[]) => {
          this.produtos = data;
        }
      });
    });
  }

  ngOnInit(): void {

  }
}
