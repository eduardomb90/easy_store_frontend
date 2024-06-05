import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string = "http://localhost:8080/categorias";

  constructor(private httpClient: HttpClient) { }

  public getAllCategorias(): Observable<Categoria[]> {
    console.log("Estou no CATEGORIASERVICE - Acessei o Back-end")

    return this.httpClient.get<Categoria[]>(this.apiUrl);
  }
}
