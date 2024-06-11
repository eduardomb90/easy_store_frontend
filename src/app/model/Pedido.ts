/* Apesar do nome Pedido (Para bater com o backend), esta classe funcionará como o Carrinho do nosso site. */

import { Cliente } from "./Cliente";
import { ItemPedido } from "./ItemPedido";

export class Pedido {
  public idPedido!: number;
  public status!: number;
  public cliente!: Cliente;
  public itensPedido: ItemPedido[] = [];
  public valorTotal: number = 0;
  public observacoes!: string;
  public timestamp!: number;
}
