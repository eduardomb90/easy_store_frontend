import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public categorias: Categoria[] = [];
  public erroMensagem: string | null = null;

  constructor(private service: CategoriaService){}

  ngOnInit(): void {
    this.service.getAllCategorias().subscribe({
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
  }
}
