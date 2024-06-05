import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})
export class DestaquesComponent implements OnInit {

  public produtos: Produto[] = [];
  public erroMensagem: string | null = null;

  constructor(private service: ProdutoService) {}

  ngOnInit(): void {
    this.service.getAllprodutos().subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
      },
      error: (error: any) => {
        this.erroMensagem = 'Ocorreu um erro ao carregar os produtos. Por favor, tente novamente mais tarde.';
        console.error('Erro ao carregar produtos:', error);

      },
      complete: () => {
        console.log('Requisição de produtos completa.');
      }
    });
  }
}
