import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {
  public idPedido!: number;


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idPedido = Number(this.route.snapshot.paramMap.get('num'));
  }

}
