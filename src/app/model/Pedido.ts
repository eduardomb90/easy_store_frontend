/* Apesar do nome Pedido (Para bater com o backend), esta classe funcionará como o Carrinho do nosso site. */

import { ItemPedido } from "./ItemPedido";

export class Pedido {
  public itensPedido: ItemPedido[] = [];
  public valorTotal: number = 0;

  constructor() {}
}
