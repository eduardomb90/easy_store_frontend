import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarprodutobykeyService {

  private keyword: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  public setKeyword(key: string) {
    this.keyword.next(key);
  }

  public getKeyword() {
    return this.keyword;
  }
}
