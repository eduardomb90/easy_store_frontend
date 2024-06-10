import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl: string = "http://localhost:8080/pedido";

  constructor(private httpClient: HttpClient) { }

  public inserirNovoPedido(novoPedido: Pedido) : Observable<Pedido>{
    return this.httpClient.post<Pedido>(`${this.apiUrl}`, novoPedido);
  }
}
