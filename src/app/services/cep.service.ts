import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private apiUrl: string = "https://viacep.com.br/ws";

  constructor(private httpClient: HttpClient) { }

  public buscarCep(cep: string) : Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/${cep}/json/`);
  }
}
