import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl: string = "http://localhost:8080/cliente";

  constructor(private httpClient: HttpClient) { }

  public buscarClientePeloTelefone(telefone: String) : Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.apiUrl}/${telefone}`);
  }

  public buscarClientePeloCpf(cpf: String) : Observable<Cliente>{
    console.log(cpf);
    return this.httpClient.get<Cliente>(`${this.apiUrl}/${cpf}`);
  }

}
