import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/Produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl: string = "http://localhost:8080/produto";

  constructor(private httpClient: HttpClient ) { }

  public getAllprodutos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.apiUrl);
  }

  public getProduto(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.apiUrl}/${id}`);
  }
}
