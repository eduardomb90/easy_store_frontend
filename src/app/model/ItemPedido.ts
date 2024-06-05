import { Produto } from "./Produto";

export class ItemPedido {
  public qtdeItem!: number;
  public precoUnitario!: number;
  public precoTotal!: number;
  public produto!: Produto;

  constructor() {}
}
